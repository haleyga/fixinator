import { ICancelOrderRequestIdField } from '../fields/cancel-order-request-id/cancel-order-request-id';
import { ICancelRejectionReasonField } from '../fields/cancel-rejection-reason/cancel-rejection-reason';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { ITextField } from '../fields/text/text';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface IOrderCancelRejectMessage extends IBaseApplicationMessage {
    orderId: IOrderIdField;
    cxlOrdReqId: ICancelOrderRequestIdField;
    listId?: IListIdField;
    cxlRejReason?: ICancelRejectionReasonField;
    text?: ITextField;
}

/**
 * The order cancel reject message is issued by the broker upon receipt of a cancel request or cancel/replace
 * request message which cannot be honored. Requests to change price or decrease quantity are executed only when an
 * outstanding quantity exists; orders which are filled cannot be changed.
 *
 * The execution message will be used to respond to accepted cancel request and cancel/replace request messages.
 *
 * The order cancel reject message format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 9
 *  37      OrderID             Y
 *  101     CxlOrdReqId         Y           ID of Cancel Request
 *  66      ListID              N           Required for rejects against orders which were submitted as part of a list.
 *  102     CxlRejReason        N
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class OrderCancelRejectMessage extends BaseApplicationMessage implements IOrderCancelRejectMessage {

    private _orderId: IOrderIdField                    = null;
    private _cxlOrdReqId: ICancelOrderRequestIdField   = null;
    private _listId: IListIdField                      = null;
    private _cxlRejReason: ICancelRejectionReasonField = null;
    private _text: ITextField                          = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get orderId(): IOrderIdField {
        return this._orderId;
    }

    public set orderId(value: IOrderIdField) {
        this._orderId = value;
    }

    public get cxlOrdReqId(): ICancelOrderRequestIdField {
        return this._cxlOrdReqId;
    }

    public set cxlOrdReqId(value: ICancelOrderRequestIdField) {
        this._cxlOrdReqId = value;
    }

    public get listId(): IListIdField {
        return this._listId;
    }

    public set listId(value: IListIdField) {
        this._listId = value;
    }

    public get cxlRejReason(): ICancelRejectionReasonField {
        return this._cxlRejReason;
    }

    public set cxlRejReason(value: ICancelRejectionReasonField) {
        this._cxlRejReason = value;
    }

    public get text(): ITextField {
        return this._text;
    }

    public set text(value: ITextField) {
        this._text = value;
    }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.order_cancel_reject;
    }
}
