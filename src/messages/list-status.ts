import { IAveragePriceField } from '../fields/average-price/average-price';
import { ICanceledQuantityField } from '../fields/canceled-quantity/canceled-quantity';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICumulativeQuantityField } from '../fields/cumulative-quantity/cumulative-quantity';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { INumberOfOrdersField } from '../fields/number-of-orders/number-of-orders';
import { INumberOfReportsField } from '../fields/number-of-reports/number-of-reports';
import { IReportSequenceNumberField } from '../fields/report-sequence-number/report-sequence-number';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

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
 * DEVELOPER'S WARNING: However, this could mean ClOrdID,ClOrdID,CumQty,CumQty,CxlQty,CxlQty,AvgPx,AvgPx...
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

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get listId(): IListIdField {
        return this._listId;
    }

    public set listId(value: IListIdField) {
        this._listId = value;
    }

    public get noRpts(): INumberOfReportsField {
        return this._noRpts;
    }

    public set noRpts(value: INumberOfReportsField) {
        this._noRpts = value;
    }

    public get rptSeq(): IReportSequenceNumberField {
        return this._rptSeq;
    }

    public set rptSeq(value: IReportSequenceNumberField) {
        this._rptSeq = value;
    }

    public get noOrders(): INumberOfOrdersField {
        return this._noOrders;
    }

    public set noOrders(value: INumberOfOrdersField) {
        this._noOrders = value;
    }

    public get clOrdId(): IClientOrderIdField[] {
        return this._clOrdId;
    }

    public set clOrdId(value: IClientOrderIdField[]) {
        this._clOrdId = value;
    }

    public get cumQty(): ICumulativeQuantityField[] {
        return this._cumQty;
    }

    public set cumQty(value: ICumulativeQuantityField[]) {
        this._cumQty = value;
    }

    public get cxlQty(): ICanceledQuantityField[] {
        return this._cxlQty;
    }

    public set cxlQty(value: ICanceledQuantityField[]) {
        this._cxlQty = value;
    }

    public get avgPx(): IAveragePriceField[] {
        return this._avgPx;
    }

    public set avgPx(value: IAveragePriceField[]) {
        this._avgPx = value;
    }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.list_status;
    }
}
