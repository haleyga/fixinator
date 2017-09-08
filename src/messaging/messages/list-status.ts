import { IAveragePriceField } from '../fields/average-price/average-price';
import { Tag } from '../fields/base/tag';
import { ICanceledQuantityField } from '../fields/canceled-quantity/canceled-quantity';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICumulativeQuantityField } from '../fields/cumulative-quantity/cumulative-quantity';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { INumberOfOrdersField } from '../fields/number-of-orders/number-of-orders';
import { INumberOfReportsField } from '../fields/number-of-reports/number-of-reports';
import { IReportSequenceNumberField } from '../fields/report-sequence-number/report-sequence-number';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoListStatusMessage extends IProtoBaseApplicationMessage {
    66: IListIdField;
    82: INumberOfReportsField;
    83: IReportSequenceNumberField;
    73: INumberOfReportsField;
    11: IClientOrderIdField[];
    14: ICumulativeQuantityField[];
    84: ICanceledQuantityField[];
    6: IAveragePriceField[];
}

//tslint:enable:no-magic-numbers

export class ProtoListStatusMessage extends ProtoBaseApplicationMessage implements IProtoListStatusMessage {
    public 66: IListIdField               = null;
    public 82: INumberOfReportsField      = null;
    public 83: IReportSequenceNumberField = null;
    public 73: INumberOfReportsField      = null;
    public 11: IClientOrderIdField[]      = null;
    public 14: ICumulativeQuantityField[] = null;
    public 84: ICanceledQuantityField[]   = null;
    public 6: IAveragePriceField[]        = null;
}

export interface IListStatusMessage extends IBaseApplicationMessage {
    listId: IListIdField;
    noRpts: INumberOfReportsField;
    rptSeq: IReportSequenceNumberField;
    noOrders: INumberOfOrdersField;
    clOrdId: IClientOrderIdField[];
    cumQty: ICumulativeQuantityField[];
    cxlQty: ICanceledQuantityField[];
    avgPx: IAveragePriceField[];
}

/**
 * The list status message is issued as the response to a List Status Request message and indicates the current
 * state of the orders within the list as they exists at the broker's site.
 *
 * Orders within the list are statused at the summary level. Individual executions are not reported, rather, the
 * current state of the order is reported.
 *
 * The message contains repeating fields for each order; the repeating fields are shown below in typeface
 * Bold-Italic (*). The relative position of the repeating fields is important in this record, i.e. each instance of
 * ClOrdID, CumQty, CxlQty and AvgPx must be in the order shown below.
 *
 * DEVELOPER'S NOTE: I interpret this to mean ClOrdID,CumQty,CxlQty,AvgPx,ClOrdID,CumQty,CxlQty,AvgPx...
 *
 * Each list status message will report on only a maximum of 50 orders; if the list contains more than 50 orders
 * multiple status messages will be required.
 *
 * The list status message format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = N
 *  66      ListID              Y
 *  82      NoRpts              Y           Total number of messages required to status complete list.
 *  83      RptSeq              Y           Sequence number of this report message.
 *  73      NoOrders            Y           Number of orders statused in this message, i.e. number of repeating
 *                                          groups to follow.
 *  11      * ClOrdID           Y
 *  14      * CumQty            Y
 *  84      * CxlQty            Y
 *  6       * AvgPx             Y
 *          <Standard Trailer>  Y
 */
export class ListStatusMessage extends BaseApplicationMessage implements IListStatusMessage {

    private _listId: IListIdField               = null;
    private _noRpts: INumberOfReportsField      = null;
    private _rptSeq: IReportSequenceNumberField = null;
    private _noOrders: INumberOfOrdersField     = null;
    private _clOrdId: IClientOrderIdField[]     = null;
    private _cumQty: ICumulativeQuantityField[] = null;
    private _cxlQty: ICanceledQuantityField[]   = null;
    private _avgPx: IAveragePriceField[]        = null;

    constructor(protoMessage: IProtoListStatusMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get listId(): IListIdField { return this._listId; }

    public get noRpts(): INumberOfReportsField { return this._noRpts; }

    public get rptSeq(): IReportSequenceNumberField { return this._rptSeq; }

    public get noOrders(): INumberOfOrdersField { return this._noOrders; }

    public get clOrdId(): IClientOrderIdField[] { return this._clOrdId; }

    public get cumQty(): ICumulativeQuantityField[] { return this._cumQty; }

    public get cxlQty(): ICanceledQuantityField[] { return this._cxlQty; }

    public get avgPx(): IAveragePriceField[] { return this._avgPx; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.list_status;
    }

    protected construct(protoMessage: IProtoListStatusMessage): void {
        this._listId   = protoMessage[Tag.ListID];
        this._noRpts   = protoMessage[Tag.NoRpts];
        this._rptSeq   = protoMessage[Tag.RptSeq];
        this._noOrders = protoMessage[Tag.NoOrders];
        this._clOrdId  = protoMessage[Tag.ClOrdID];
        this._cumQty   = protoMessage[Tag.CumQty];
        this._cxlQty   = protoMessage[Tag.CxlQty];
        this._avgPx    = protoMessage[Tag.AvgPx];
    }
}
