import { AllocationAccountField } from '../../messaging/fields/allocation-account/allocation-account';
import { AllocationIdField } from '../../messaging/fields/allocation-id/allocation-id';
import {
    AllocationShareCountField,
} from '../../messaging/fields/allocation-share-count/allocation-share-count';
import {
    AllocationTransactionTypeField,
} from '../../messaging/fields/allocation-transaction-type/allocation-transaction-type';
import { AveragePricePrecisionField } from '../../messaging/fields/average-price-precision/average-price-precision';
import { AveragePriceField } from '../../messaging/fields/average-price/average-price';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { BrokerOfCreditField } from '../../messaging/fields/broker-of-credit/broker-of-credit';
import { ClientOrderIdField } from '../../messaging/fields/client-order-id/client-order-id';
import { CommissionTypeField } from '../../messaging/fields/commission-type/commission-type';
import { CommissionField } from '../../messaging/fields/commission/commission';
import { DeliveryInstructionsField } from '../../messaging/fields/delivery-instructions/delivery-instructions';
import { ExecutingBrokerField } from '../../messaging/fields/executing-broker/executing-broker';
import { IdSourceField } from '../../messaging/fields/id-source/id-source';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { NumberOfAllocationsField } from '../../messaging/fields/number-of-allocations/number-of-allocations';
import {
    NumberOfDeliveryInstructionsField,
} from '../../messaging/fields/number-of-delivery-instructions/number-of-delivery-instructions';
import { NumberOfOrdersField } from '../../messaging/fields/number-of-orders/number-of-orders';
import { OpenCloseField } from '../../messaging/fields/open-close/open-close';
import { OrderIdField } from '../../messaging/fields/order-id/order-id';
import { ProcessCodeField } from '../../messaging/fields/process-code/process-code';
import { ReferenceAllocationIdField } from '../../messaging/fields/reference-allocation-id/reference-allocation-id';
import { SecurityIdField } from '../../messaging/fields/security-id/security-id';
import { SettlementTypeField, SETTLEMENT_TYPE } from '../../messaging/fields/settlement-type/settlement-type';
import { SharesField } from '../../messaging/fields/shares/shares';
import { SideField } from '../../messaging/fields/side/side';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import { TextField } from '../../messaging/fields/text/text';
import { TradeDateField } from '../../messaging/fields/trade-date/trade-date';
import {
    AllocationMessage,
    IAllocationMessage, IProtoAllocationMessage, ProtoAllocationMessage,
} from '../../messaging/messages/allocation';
import { FixinatorDate } from '../../util/datetime';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IAllocationMessageBuilder extends IBaseMessageBuilder {
    message: IAllocationMessage;
}

export class AllocationMessageBuilder extends BaseMessageBuilder implements IAllocationMessageBuilder {

    protected _message: IAllocationMessage           = null;
    protected _protoMessage: IProtoAllocationMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoAllocationMessage();
    }

    public get message(): IAllocationMessage { return this._message; }

    // tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag = Number(keyValue[0]) as Tag;
        const rawValue: string = keyValue[1];
        let field      = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.AllocID:
                this._protoMessage[Tag.AllocID] = new AllocationIdField(rawValue);
                break;
            case Tag.AllocTransType:
                this._protoMessage[Tag.AllocTransType] = new AllocationTransactionTypeField(rawValue);
                break;
            case Tag.RefAllocID:
                this._protoMessage[Tag.RefAllocID] = new ReferenceAllocationIdField(rawValue);
                break;
            case Tag.NoOrders:
                this._protoMessage[Tag.NoOrders] = new NumberOfOrdersField(rawValue);
                break;
            case Tag.ClOrdID:
                field = new ClientOrderIdField(rawValue);
                this._protoMessage[Tag.ClOrdID]
                    ? this._protoMessage[Tag.ClOrdID].push(field)
                    : this._protoMessage[Tag.ClOrdID] = [field];
                break;
            case Tag.OrderID:
                field = new OrderIdField(rawValue);
                this._protoMessage[Tag.OrderID]
                    ? this._protoMessage[Tag.OrderID].push(field)
                    : this._protoMessage[Tag.OrderID] = [field];
                break;
            case Tag.ListID:
                field = new ListIdField(rawValue);
                this._protoMessage[Tag.ListID]
                    ? this._protoMessage[Tag.ListID].push(field)
                    : this._protoMessage[Tag.ListID] = [field];
                break;
            case Tag.Side:
                this._protoMessage[Tag.Side] = new SideField(rawValue);
                break;
            case Tag.Symbol:
                this._protoMessage[Tag.Symbol] = new SymbolField(rawValue);
                break;
            case Tag.SymbolSfx:
                this._protoMessage[Tag.SymbolSfx] = new SymbolSuffixField(rawValue);
                break;
            case Tag.SecurityID:
                this._protoMessage[Tag.SecurityID] = new SecurityIdField(rawValue);
                break;
            case Tag.IDSource:
                this._protoMessage[Tag.IDSource] = new IdSourceField(rawValue);
                break;
            case Tag.Shares:
                this._protoMessage[Tag.Shares] = new SharesField(rawValue);
                break;
            case Tag.AvgPx:
                this._protoMessage[Tag.AvgPx] = new AveragePriceField(rawValue);
                break;
            case Tag.AvgPxPrecision:
                this._protoMessage[Tag.AvgPxPrecision] = new AveragePricePrecisionField(rawValue);
                break;
            case Tag.TradeDate:
                this._protoMessage[Tag.TradeDate] = new TradeDateField(rawValue);
                break;
            case Tag.SettlmntTyp:
                this._protoMessage[Tag.SettlmntTyp] = new SettlementTypeField(rawValue);
                break;
            case Tag.OpenClose:
                this._protoMessage[Tag.OpenClose] = new OpenCloseField(rawValue);
                break;
            case Tag.Text:
                this._protoMessage[Tag.Text] = new TextField(rawValue);
                break;
            case Tag.NoAllocs:
                this._protoMessage[Tag.NoAllocs] = new NumberOfAllocationsField(rawValue);
                break;
            case Tag.AllocAccount:
                field = new AllocationAccountField(rawValue);
                this._protoMessage[Tag.AllocAccount]
                    ? this._protoMessage[Tag.AllocAccount].push(field)
                    : this._protoMessage[Tag.AllocAccount] = [field];
                break;
            case Tag.AllocShares:
                field = new AllocationShareCountField(rawValue);
                this._protoMessage[Tag.AllocShares]
                    ? this._protoMessage[Tag.AllocShares].push(field)
                    : this._protoMessage[Tag.AllocShares] = [field];
                break;
            case Tag.ProcessCode:
                field = new ProcessCodeField(rawValue);
                this._protoMessage[Tag.ProcessCode]
                    ? this._protoMessage[Tag.ProcessCode].push(field)
                    : this._protoMessage[Tag.ProcessCode] = [field];
                break;
            case Tag.ExecBroker:
                field = new ExecutingBrokerField(rawValue);
                this._protoMessage[Tag.ExecBroker]
                    ? this._protoMessage[Tag.ExecBroker].push(field)
                    : this._protoMessage[Tag.ExecBroker] = [field];
                break;
            case Tag.Commission:
                field = new CommissionField(rawValue);
                this._protoMessage[Tag.Commission]
                    ? this._protoMessage[Tag.Commission].push(field)
                    : this._protoMessage[Tag.Commission] = [field];
                break;
            case Tag.CommType:
                field = new CommissionTypeField(rawValue);
                this._protoMessage[Tag.CommType]
                    ? this._protoMessage[Tag.CommType].push(field)
                    : this._protoMessage[Tag.CommType] = [field];
                break;
            case Tag.NoDlvyInst:
                field = new NumberOfDeliveryInstructionsField(rawValue);
                this._protoMessage[Tag.NoDlvyInst]
                    ? this._protoMessage[Tag.NoDlvyInst].push(field)
                    : this._protoMessage[Tag.NoDlvyInst] = [field];
                break;
            case Tag.BrokerOfCredit:
                field = new BrokerOfCreditField(rawValue);
                this._protoMessage[Tag.BrokerOfCredit]
                    ? this._protoMessage[Tag.BrokerOfCredit].push(field)
                    : this._protoMessage[Tag.BrokerOfCredit] = [field];
                break;
            case Tag.DlvyInst:
                field = new DeliveryInstructionsField(rawValue);
                this._protoMessage[Tag.DlvyInst]
                    ? this._protoMessage[Tag.DlvyInst].push(field)
                    : this._protoMessage[Tag.DlvyInst] = [field];
                break;
            default:
                rawDataLength = super.parseField(token);
                if (this._messageIsComplete) this.finalizeAndEmitMessage();
        }

        return rawDataLength;
    }

    // tslint:enable:cyclomatic-complexity

    public pushRawData(raw: string): boolean {

        let done: boolean = false;

        if (this._readingRawData) {
            this._rawBuffer += raw;
            if (this._rawBuffer.length === this._expectedRawLength) {

                //  Since we should be reading a raw data field, we can safely assume that #parseField will return
                // -1 (unless a disaster happened).
                this.parseField(this._rawBuffer);

                this._expectedRawLength = 0;
                this._readingRawData    = false;

                done = true;
            }
        } else {
            this._readingRawData = true;
        }

        return done;
    }

    /**
     * This method must be called in order to prepare the builder for a new stream of fields.
     *
     * @param {IBeginningOfStringField} beginningOfStringField
     * @param {IBodyLengthField} bodyLengthField
     * @param {IMessageTypeField} messageTypeField
     */
    public reset(beginningOfStringField: IBeginningOfStringField,
                 bodyLengthField: IBodyLengthField,
                 messageTypeField: IMessageTypeField): void
    {
        super.reset(beginningOfStringField, bodyLengthField, messageTypeField);

        this._message      = null;
        this._protoMessage = new ProtoAllocationMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.allocation;
        const message = new AllocationMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The allocation record is used by the institution to instruct the broker on how to allocate executed shares to
     *  sub-accounts.
     *
     *  The allocation record contains repeating fields for each sub-account; the repeating fields are shown below in
     *  typeface Bold-Italic (*). The relative position of the repeating fields is important in this record, i.e. each
     *  instance of allocation must be in the order shown below.
     *
     *      • The total shares allocated must equal the Shares value which must equal the total executed quantity of the
     *        original order.
     *      • The number of instances of allocations is indicated in NoAllocs.
     *      • Multiple orders can be combined for allocation by identifying the number of orders in the NoOrders field
     *        and each individual order in the OrderID fields. Combined orders must have the same ticker, trade
     *        date, settlement date and side.
     *      • Single orders cannot be combined with list orders for allocation.
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = J
     *      70      AllocID             Y
     *      71      AllocTransTyp       Y
     *      72      RefAllocID          N           Required for AllocTransType = R (Replace) or C (Cancel)
     *      73      NoOrders            N           Indicates number of orders to be combined for allocation. Absence of
     *                                              this field indicates allocation is for one order.
     *      11      * ClOrdID           Y           Can be repeated to identify multiple orders to be combined for
     *                                              average pricing.
     *      37      * OrderID           N           Can be repeated to identify multiple orders to be combined for
     *                                              average pricing.
     *      66      * ListID            N           Required for List Orders. Can be repeated to identify multiple
     *                                              orders to be combined for average pricing.
     *      54      Side                Y
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      53      Shares              Y           Total number of shares to be allocated, (must match total executed
     *                                              quantity of order)
     *      6       AvgPx               Y
     *      74      AvgPxPrecision      N           Absence of this field indicates that default precision arranged by
     *                                              the broker/institution is to be used.
     *      75      TradeDate           N           Absence of this field indicates current day
     *      63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *      77      OpenClose           N
     *      58      Text                N
     *      78      NoAllocs            Y
     *      79      * AllocAccount      Y
     *      80      * AllocShares       Y
     *      81      * ProcessCode       N
     *      76      * ExecBroker        N           Required for step-in and step-out trades
     *      12      * Commission        N
     *      13      * CommType          N
     *      85      * NoDlvyInst        N
     *      92      * BrokerOfCredit    N
     *      86      * DlvyInst          N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    // tslint:disable:cyclomatic-complexity
    protected validate(): boolean {
        super.validate();

        if (!this._protoMessage[Tag.NoOrders]) this._protoMessage[Tag.NoOrders] = new NumberOfOrdersField('1');
        const numberOfOrders: number = this._protoMessage[Tag.NoOrders].formatted;

        if (this._protoMessage[Tag.ClOrdID].length !== numberOfOrders) return false;
        if (this._protoMessage[Tag.OrderID] && this._protoMessage[Tag.OrderID].length !== numberOfOrders) return false;
        if (this._protoMessage[Tag.ListID] && this._protoMessage[Tag.ListID].length !== numberOfOrders) return false;

        if (!this._protoMessage[Tag.TradeDate]) {
            this._protoMessage[Tag.TradeDate] = new TradeDateField(FixinatorDate.todayAsFixDateString());
        }

        if (!this._protoMessage[Tag.SettlmntTyp]) {
            this._protoMessage[Tag.SettlmntTyp] = new SettlementTypeField(SETTLEMENT_TYPE.regular);
        }

        const numberOfAllocations: number = this._protoMessage[Tag.NoAllocs].formatted;

        if (this._protoMessage[Tag.AllocAccount].length !== numberOfAllocations) return false;
        if (this._protoMessage[Tag.AllocShares].length !== numberOfAllocations) return false;

        const count = this._protoMessage[Tag.AllocShares].reduce((sum, value) => sum + value.formatted, 0);
        if (count !== this._protoMessage[Tag.Shares].formatted) return false;

        if (this._protoMessage[Tag.ProcessCode] && this._protoMessage[Tag.ProcessCode].length !== numberOfAllocations) {
            return false;
        }

        if (this._protoMessage[Tag.ExecBroker] && this._protoMessage[Tag.ExecBroker].length !== numberOfAllocations) {
            return false;
        }

        if (this._protoMessage[Tag.Commission] && this._protoMessage[Tag.Commission].length !== numberOfAllocations) {
            return false;
        }

        if (this._protoMessage[Tag.CommType] && this._protoMessage[Tag.CommType].length !== numberOfAllocations) {
            return false;
        }

        if (this._protoMessage[Tag.NoDlvyInst] && this._protoMessage[Tag.NoDlvyInst].length !== numberOfAllocations) {
            return false;
        }

        if (this._protoMessage[Tag.BrokerOfCredit]
            && this._protoMessage[Tag.BrokerOfCredit].length !== numberOfAllocations)
        {
            return false;
        }

        if (this._protoMessage[Tag.DlvyInst] && this._protoMessage[Tag.DlvyInst].length !== numberOfAllocations) {
            return false;
        }

        // TODO: Verify CheckSum

        return true;
    }

    // tslint:enable:cyclomatic-complexity
}
