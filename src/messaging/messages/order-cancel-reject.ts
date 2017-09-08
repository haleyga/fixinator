import { Tag } from '../fields/base/tag';
import { ICancelOrderRequestIdField } from '../fields/cancel-order-request-id/cancel-order-request-id';
import { ICancelRejectionReasonField } from '../fields/cancel-rejection-reason/cancel-rejection-reason';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { ITextField } from '../fields/text/text';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoOrderCancelRejectMessage extends IProtoBaseApplicationMessage {
    37: IOrderIdField;
    101: ICancelOrderRequestIdField;
    66?: IListIdField;
    102?: ICancelRejectionReasonField;
    58?: ITextField;
}

// tslint:enable:no-magic-numbers

export class ProtoOrderCancelRejectMessage extends ProtoBaseApplicationMessage
    implements IProtoOrderCancelRejectMessage
{
    public 37: IOrderIdField               = null;
    public 101: ICancelOrderRequestIdField = null;
}

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

    constructor(protoMessage: IProtoOrderCancelRejectMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get orderId(): IOrderIdField { return this._orderId; }

    public get cxlOrdReqId(): ICancelOrderRequestIdField { return this._cxlOrdReqId; }

    public get listId(): IListIdField { return this._listId; }

    public get cxlRejReason(): ICancelRejectionReasonField { return this._cxlRejReason; }

    public get text(): ITextField { return this._text; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.order_cancel_reject;
    }

    protected construct(protoMessage: IProtoOrderCancelRejectMessage): void {
        this._orderId      = protoMessage[Tag.OrderID];
        this._cxlOrdReqId  = protoMessage[Tag.CxlOrdReqId];
        this._listId       = protoMessage[Tag.ListID];
        this._cxlRejReason = protoMessage[Tag.CxlRejReason];
        this._text         = protoMessage[Tag.Text];
    }
}
