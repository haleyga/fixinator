import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { ISideField } from '../fields/side/side';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

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

    public get clOrdId(): IClientOrderIdField {
        return this._clOrdId;
    }

    public set clOrdId(value: IClientOrderIdField) {
        this._clOrdId = value;
    }

    public get symbol(): ISymbolField {
        return this._symbol;
    }

    public set symbol(value: ISymbolField) {
        this._symbol = value;
    }

    public get symbolSfx(): ISymbolSuffixField {
        return this._symbolSfx;
    }

    public set symbolSfx(value: ISymbolSuffixField) {
        this._symbolSfx = value;
    }

    public get side(): ISideField {
        return this._side;
    }

    public set side(value: ISideField) {
        this._side = value;
    }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.order_status_request;
    }
}
