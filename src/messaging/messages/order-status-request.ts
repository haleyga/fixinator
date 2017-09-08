import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { ISideField } from '../fields/side/side';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';
import { Tag } from '../fields/base/tag';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoOrderStatusRequestMessage extends IProtoBaseApplicationMessage {
    37?: IOrderIdField;
    11: IClientOrderIdField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    54: ISideField;
}

// tslint:enable:no-magic-numbers

export class ProtoOrderStatusRequestMessage extends ProtoBaseApplicationMessage
    implements IProtoOrderStatusRequestMessage
{
    public 11: IClientOrderIdField = null;
    public 55: ISymbolField        = null;
    public 54: ISideField          = null;
}

export interface IOrderStatusRequestMessage extends IBaseApplicationMessage {
    orderId?: IOrderIdField;
    clOrdId: IClientOrderIdField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    side: ISideField;
}

/**
 * The order status request message is used by the institution to generate an order status message back from the broker.
 *
 * The format of the order status request message is:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = H
 *  37      OrderID             N
 *  11      ClOrdId             Y
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  54      Side                Y
 *          <Standard Trailer>  Y
 */
export class OrderStatusRequestMessage extends BaseApplicationMessage implements IOrderStatusRequestMessage {

    private _orderId: IOrderIdField        = null;
    private _clOrdId: IClientOrderIdField  = null;
    private _symbol: ISymbolField          = null;
    private _symbolSfx: ISymbolSuffixField = null;
    private _side: ISideField              = null;

    constructor(protoMessage: IProtoOrderStatusRequestMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get orderId(): IOrderIdField { return this._orderId; }

    public get clOrdId(): IClientOrderIdField { return this._clOrdId; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get side(): ISideField { return this._side; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.order_status_request;
    }

    protected construct(protoMessage: IProtoOrderStatusRequestMessage): void {
        this._orderId   = protoMessage[Tag.OrderID];
        this._clOrdId   = protoMessage[Tag.ClOrdID];
        this._symbol    = protoMessage[Tag.Symbol];
        this._symbolSfx = protoMessage[Tag.SymbolSfx];
        this._side      = protoMessage[Tag.Side];
    }
}
