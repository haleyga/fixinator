import { IAllocationAccountField } from '../fields/allocation-account/allocation-account';
import { IAllocationIdField } from '../fields/allocation-id/allocation-id';
import { IAllocationShareCountField } from '../fields/allocation-share-count/allocation-share-count';
import { IAllocationTransactionTypeField } from '../fields/allocation-transaction-type/allocation-transaction-type';
import { IAveragePricePrecisionField } from '../fields/average-price-precision/average-price-precision';
import { IAveragePriceField } from '../fields/average-price/average-price';
import { Tag } from '../fields/base/tag';
import { IBrokerOfCreditField } from '../fields/broker-of-credit/broker-of-credit';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICommissionTypeField } from '../fields/commission-type/commission-type';
import { ICommissionField } from '../fields/commission/commission';
import { IDeliveryInstructionsField } from '../fields/delivery-instructions/delivery-instructions';
import { IExecutingBrokerField } from '../fields/executing-broker/executing-broker';
import { IIdSourceField } from '../fields/id-source/id-source';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { INumberOfAllocationsField } from '../fields/number-of-allocations/number-of-allocations';
import {
    INumberOfDeliveryInstructionsField,
} from '../fields/number-of-delivery-instructions/number-of-delivery-instructions';
import { INumberOfOrdersField } from '../fields/number-of-orders/number-of-orders';
import { IOpenCloseField } from '../fields/open-close/open-close';
import { IOrderIdField } from '../fields/order-id/order-id';
import { IProcessCodeField } from '../fields/process-code/process-code';
import { IReferenceAllocationIdField } from '../fields/reference-allocation-id/reference-allocation-id';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISettlementTypeField } from '../fields/settlement-type/settlement-type';
import { ISharesField } from '../fields/shares/shares';
import { ISideField } from '../fields/side/side';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { ITradeDateField } from '../fields/trade-date/trade-date';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoAllocationMessage extends IProtoBaseApplicationMessage {
    70: IAllocationIdField;
    71: IAllocationTransactionTypeField;
    72?: IReferenceAllocationIdField;
    73?: INumberOfOrdersField;
    11: IClientOrderIdField[];
    37?: IOrderIdField[];
    66?: IListIdField[];
    54: ISideField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    48?: ISecurityIdField;
    22?: IIdSourceField;
    53: ISharesField;
    6: IAveragePriceField;
    74?: IAveragePricePrecisionField;
    75?: ITradeDateField;
    63?: ISettlementTypeField;
    77?: IOpenCloseField;
    58?: ITextField;
    78: INumberOfAllocationsField;
    79: IAllocationAccountField[];
    80: IAllocationShareCountField[];
    81?: IProcessCodeField[];
    76?: IExecutingBrokerField[];
    12?: ICommissionField[];
    13?: ICommissionTypeField[];
    85?: INumberOfDeliveryInstructionsField[];
    92?: IBrokerOfCreditField[];
    86?: IDeliveryInstructionsField[];
}

//tslint:enable:no-magic-numbers

export class ProtoAllocationMessage extends ProtoBaseApplicationMessage implements IProtoAllocationMessage {
    public 70: IAllocationIdField              = null;
    public 71: IAllocationTransactionTypeField = null;
    public 11: IClientOrderIdField[]           = null;
    public 54: ISideField                      = null;
    public 55: ISymbolField                    = null;
    public 53: ISharesField                    = null;
    public 6: IAveragePriceField               = null;
    public 78: INumberOfAllocationsField       = null;
    public 79: IAllocationAccountField[]       = null;
    public 80: IAllocationShareCountField[]    = null;
}

export interface IAllocationMessage extends IBaseApplicationMessage {
    allocId: IAllocationIdField;
    allocTransTyp: IAllocationTransactionTypeField;
    refAllocId?: IReferenceAllocationIdField;
    noOrders?: INumberOfOrdersField;
    clOrdId: IClientOrderIdField[];
    orderId?: IOrderIdField[];
    listId?: IListIdField[];
    side: ISideField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityId?: ISecurityIdField;
    idSource?: IIdSourceField;
    shares: ISharesField;
    avgPx: IAveragePriceField;
    avgPxPrecision?: IAveragePricePrecisionField;
    tradeDate?: ITradeDateField;
    settlmntTyp?: ISettlementTypeField;
    openClose?: IOpenCloseField;
    text?: ITextField;
    noAllocs: INumberOfAllocationsField;
    allocAccount: IAllocationAccountField[];
    allocShares: IAllocationShareCountField[];
    processCode?: IProcessCodeField[];
    execBroker?: IExecutingBrokerField[];
    commission?: ICommissionField[];
    commType?: ICommissionTypeField[];
    noDlvyInst?: INumberOfDeliveryInstructionsField[];
    brokerOfCredit?: IBrokerOfCreditField[];
    dlvyInst?: IDeliveryInstructionsField[];
}

/**
 * The allocation record is used by the institution to instruct the broker on how to allocate executed shares to
 * sub-accounts.
 *
 * The allocation record contains repeating fields for each sub-account; the repeating fields are shown below in
 * typeface Bold-Italic (*). The relative position of the repeating fields is important in this record, i.e. each
 * instance of allocation must be in the order shown below.
 *
 *  • The total shares allocated must equal the Shares value which must equal the total executed quantity of the
 *    original order.
 *  • The number of instances of allocations is indicated in NoAllocs.
 *  • Multiple orders can be combined for allocation by identifying the number of orders in the NoOrders field and
 *    each individual order in the OrderID fields. Combined orders must have the same ticker, trade date, settlement
 *    date and side.
 *  • Single orders cannot be combined with list orders for allocation.
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = J
 *  70      AllocID             Y
 *  71      AllocTransTyp       Y
 *  72      RefAllocID          N           Required for AllocTransType = R (Replace) or C (Cancel)
 *  73      NoOrders            N           Indicates number of orders to be combined for allocation. Absense of
 *                                          this field indicates allocation is for one order.
 *  11      * ClOrdID           Y           Can be repeated to identify multiple orders to be combined for average
 *                                          pricing.
 *  37      * OrderID           N           Can be repeated to identify multiple orders to be combined for average
 *                                          pricing.
 *  66      * ListID            N           Required for List Orders. Can be repeated to identify multiple orders to
 *                                          be combined for average pricing.
 *  54      Side                Y
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  53      Shares              Y           Total number of shares to be allocated, (must match total executed
 *                                          quantity of order)
 *  6       AvgPx               Y
 *  74      AvgPxPrecision      N           Absence of this field indicates that default precision arranged by the
 *                                          broker/institution is to be used.
 *  75      TradeDate           N           Absence of this field indicates current day
 *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
 *  77      OpenClose           N
 *  58      Text                N
 *  78      NoAllocs            Y
 *  79      * AllocAccount      Y
 *  80      * AllocShares       Y
 *  81      * ProcessCode       N
 *  76      * ExecBroker        N           Required for step-in and step-out trades
 *  12      * Commission        N
 *  13      * CommType          N
 *  85      * NoDlvyInst        N
 *  92      * BrokerOfCredit    N
 *  86      * DlvyInst          N
 *          <Standard Trailer>  Y
 */
export class AllocationMessage extends BaseApplicationMessage implements IAllocationMessage {

    private _allocId: IAllocationIdField                      = null;
    private _allocTransTyp: IAllocationTransactionTypeField   = null;
    private _refAllocId: IReferenceAllocationIdField          = null;
    private _noOrders: INumberOfOrdersField                   = null;
    private _clOrdId: IClientOrderIdField[]                   = null;
    private _orderId: IOrderIdField[]                         = null;
    private _listId: IListIdField[]                           = null;
    private _side: ISideField                                 = null;
    private _symbol: ISymbolField                             = null;
    private _symbolSfx: ISymbolSuffixField                    = null;
    private _securityId: ISecurityIdField                     = null;
    private _idSource: IIdSourceField                         = null;
    private _shares: ISharesField                             = null;
    private _avgPx: IAveragePriceField                        = null;
    private _avgPxPrecision: IAveragePricePrecisionField      = null;
    private _tradeDate: ITradeDateField                       = null;
    private _settlmntTyp: ISettlementTypeField                = null;
    private _openClose: IOpenCloseField                       = null;
    private _text: ITextField                                 = null;
    private _noAllocs: INumberOfAllocationsField              = null;
    private _allocAccount: IAllocationAccountField[]          = null;
    private _allocShares: IAllocationShareCountField[]        = null;
    private _processCode: IProcessCodeField[]                 = null;
    private _execBroker: IExecutingBrokerField[]              = null;
    private _commission: ICommissionField[]                   = null;
    private _commType: ICommissionTypeField[]                 = null;
    private _noDlvyInst: INumberOfDeliveryInstructionsField[] = null;
    private _brokerOfCredit: IBrokerOfCreditField[]           = null;
    private _dlvyInst: IDeliveryInstructionsField[]           = null;

    constructor(protoMessage: IProtoAllocationMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get allocId(): IAllocationIdField { return this._allocId; }

    public get allocTransTyp(): IAllocationTransactionTypeField { return this._allocTransTyp; }

    public get refAllocId(): IReferenceAllocationIdField { return this._refAllocId; }

    public get noOrders(): INumberOfOrdersField { return this._noOrders; }

    public get clOrdId(): IClientOrderIdField[] { return this._clOrdId; }

    public get orderId(): IOrderIdField[] { return this._orderId; }

    public get listId(): IListIdField[] { return this._listId; }

    public get side(): ISideField { return this._side; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public get shares(): ISharesField { return this._shares; }

    public get avgPx(): IAveragePriceField { return this._avgPx; }

    public get avgPxPrecision(): IAveragePricePrecisionField { return this._avgPxPrecision; }

    public get tradeDate(): ITradeDateField { return this._tradeDate; }

    public get settlmntTyp(): ISettlementTypeField { return this._settlmntTyp; }

    public get openClose(): IOpenCloseField { return this._openClose; }

    public get text(): ITextField { return this._text; }

    public get noAllocs(): INumberOfAllocationsField { return this._noAllocs; }

    public get allocAccount(): IAllocationAccountField[] { return this._allocAccount; }

    public get allocShares(): IAllocationShareCountField[] { return this._allocShares; }

    public get processCode(): IProcessCodeField[] { return this._processCode; }

    public get execBroker(): IExecutingBrokerField[] { return this._execBroker; }

    public get commission(): ICommissionField[] { return this._commission; }

    public get commType(): ICommissionTypeField[] { return this._commType; }

    public get noDlvyInst(): INumberOfDeliveryInstructionsField[] { return this._noDlvyInst; }

    public get brokerOfCredit(): IBrokerOfCreditField[] { return this._brokerOfCredit; }

    public get dlvyInst(): IDeliveryInstructionsField[] { return this._dlvyInst; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.allocation;
    }

    protected construct(protoMessage: IProtoAllocationMessage): void {
        this._allocId        = protoMessage[Tag.AllocID];
        this._allocTransTyp  = protoMessage[Tag.AllocTransType];
        this._refAllocId     = protoMessage[Tag.RefAllocID];
        this._noOrders       = protoMessage[Tag.NoOrders];
        this._clOrdId        = protoMessage[Tag.ClOrdID];
        this._orderId        = protoMessage[Tag.OrderID];
        this._listId         = protoMessage[Tag.ListID];
        this._side           = protoMessage[Tag.Side];
        this._symbol         = protoMessage[Tag.Symbol];
        this._symbolSfx      = protoMessage[Tag.SymbolSfx];
        this._securityId     = protoMessage[Tag.SecurityID];
        this._idSource       = protoMessage[Tag.IDSource];
        this._shares         = protoMessage[Tag.Shares];
        this._avgPx          = protoMessage[Tag.AvgPx];
        this._avgPxPrecision = protoMessage[Tag.AvgPxPrecision];
        this._tradeDate      = protoMessage[Tag.TradeDate];
        this._settlmntTyp    = protoMessage[Tag.SettlmntTyp];
        this._openClose      = protoMessage[Tag.OpenClose];
        this._text           = protoMessage[Tag.Text];
        this._noAllocs       = protoMessage[Tag.NoAllocs];
        this._allocAccount   = protoMessage[Tag.AllocAccount];
        this._allocShares    = protoMessage[Tag.AllocShares];
        this._processCode    = protoMessage[Tag.ProcessCode];
        this._execBroker     = protoMessage[Tag.ExecBroker];
        this._commission     = protoMessage[Tag.Commission];
        this._commType       = protoMessage[Tag.CommType];
        this._noDlvyInst     = protoMessage[Tag.NoDlvyInst];
        this._brokerOfCredit = protoMessage[Tag.BrokerOfCredit];
        this._dlvyInst       = protoMessage[Tag.DlvyInst];
    }
}
