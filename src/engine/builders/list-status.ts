import { AveragePriceField } from '../../messaging/fields/average-price/average-price';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { CanceledQuantityField } from '../../messaging/fields/canceled-quantity/canceled-quantity';
import { ClientOrderIdField } from '../../messaging/fields/client-order-id/client-order-id';
import { CumulativeQuantityField } from '../../messaging/fields/cumulative-quantity/cumulative-quantity';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { NumberOfOrdersField } from '../../messaging/fields/number-of-orders/number-of-orders';
import { NumberOfReportsField } from '../../messaging/fields/number-of-reports/number-of-reports';
import { ReportSequenceNumberField } from '../../messaging/fields/report-sequence-number/report-sequence-number';
import {
    IListStatusMessage, IProtoListStatusMessage, ListStatusMessage, ProtoListStatusMessage,
} from '../../messaging/messages/list-status';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IListStatusMessageBuilder extends IBaseMessageBuilder {
    message: IListStatusMessage;
}

export class ListStatusMessageBuilder extends BaseMessageBuilder implements IListStatusMessageBuilder {

    // These private members track state across multiple messages.  Do not reset them when resetting the builder.
    private _sizeOfCurrentReportSet: number = null;
    private _numberOfReportReceived: number = null;
    private _lastReportSequence: number     = null;

    protected _message: IListStatusMessage           = null;
    protected _protoMessage: IProtoListStatusMessage = null;

    constructor() {
        super();

        this._sizeOfCurrentReportSet = 0;
        this._numberOfReportReceived = 0;
        this._lastReportSequence     = 0;
        this._protoMessage           = new ProtoListStatusMessage();
    }

    public get message(): IListStatusMessage { return this._message; }

    // tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        let field                = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.ListID:
                this._protoMessage[Tag.ListID] = new ListIdField(rawValue);
                break;
            case Tag.NoRpts:
                this._protoMessage[Tag.NoRpts] = new NumberOfReportsField(rawValue);
                break;
            case Tag.RptSeq:
                this._protoMessage[Tag.RptSeq] = new ReportSequenceNumberField(rawValue);
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
            case Tag.CumQty:
                field = new CumulativeQuantityField(rawValue);
                this._protoMessage[Tag.CumQty]
                    ? this._protoMessage[Tag.CumQty].push(field)
                    : this._protoMessage[Tag.CumQty] = [field];
                break;
            case Tag.CxlQty:
                field = new CanceledQuantityField(rawValue);
                this._protoMessage[Tag.CxlQty]
                    ? this._protoMessage[Tag.CxlQty].push(field)
                    : this._protoMessage[Tag.CxlQty] = [field];
                break;
            case Tag.AvgPx:
                field = new AveragePriceField(rawValue);
                this._protoMessage[Tag.AvgPx]
                    ? this._protoMessage[Tag.AvgPx].push(field)
                    : this._protoMessage[Tag.AvgPx] = [field];
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
     * This method must be called in order to prepare the builder for a new stream of fields.  It does not reset
     * state members.  It only reinitializes the message and proto message.
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
        this._protoMessage = new ProtoListStatusMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.list_status;
        const message = new ListStatusMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The list status message is issued as the response to a List Status Request message and indicates the current
     *  state of the orders within the list as they exists at the broker's site.
     *
     *  Orders within the list are statused at the summary level. Individual executions are not reported, rather, the
     *  current state of the order is reported.
     *
     *  The message contains repeating fields for each order; the repeating fields are shown below in typeface
     *  Bold-Italic (*). The relative position of the repeating fields is important in this record, i.e. each
     *  instance of ClOrdID, CumQty, CxlQty and AvgPx must be in the order shown below.
     *
     *  DEVELOPER'S NOTE: I interpret this to mean ClOrdID,CumQty,CxlQty,AvgPx,ClOrdID,CumQty,CxlQty,AvgPx...
     *
     *  Each list status message will report on only a maximum of 50 orders; if the list contains more than 50 orders
     *  multiple status messages will be required.
     *
     *  The list status message format is as follows:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = N
     *      66      ListID              Y
     *      82      NoRpts              Y           Total number of messages required to status complete list.
     *      83      RptSeq              Y           Sequence number of this report message.
     *      73      NoOrders            Y           Number of orders statused in this message, i.e. number of repeating
     *                                              groups to follow.
     *      11      * ClOrdID           Y
     *      14      * CumQty            Y
     *      84      * CxlQty            Y
     *      6       * AvgPx             Y
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {
        super.validate();

        if (this._sizeOfCurrentReportSet === 0) {
            this._sizeOfCurrentReportSet = this._protoMessage[Tag.NoRpts].formatted;
        } else if (this._protoMessage[Tag.RptSeq].formatted !== this._lastReportSequence + 1) {
            return false;
        } else if (this._numberOfReportReceived + 1 > this._sizeOfCurrentReportSet) {
            return false;
        } else if (this._numberOfReportReceived + 1 === this._sizeOfCurrentReportSet) {
            this._sizeOfCurrentReportSet = 0;
            this._numberOfReportReceived = 0;
            this._lastReportSequence     = 0;
        } else {
            this._numberOfReportReceived++;
            this._lastReportSequence = this._protoMessage[Tag.RptSeq].formatted;
        }

        const numberOfOrders = this._protoMessage[Tag.NoOrders].formatted;
        if (this._protoMessage[Tag.ClOrdID].length !== numberOfOrders) return false;
        if (this._protoMessage[Tag.CumQty].length !== numberOfOrders) return false;
        if (this._protoMessage[Tag.CxlQty].length !== numberOfOrders) return false;
        if (this._protoMessage[Tag.AvgPx].length !== numberOfOrders) return false;

        return true;
    }
}
