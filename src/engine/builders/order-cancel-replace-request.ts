import { IOrderCancelReplaceRequestMessage } from '../../messaging/messages/order-cancel-replace-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderCancelReplaceRequestMessageBuilder extends IBaseMessageBuilder {
    message: IOrderCancelReplaceRequestMessage;
}

// TODO: Perform field order verification here
export class OrderCancelReplaceRequestMessageBuilder extends BaseMessageBuilder implements IOrderCancelReplaceRequestMessageBuilder {

    protected _message: IOrderCancelReplaceRequestMessage = null;

    public get message(): IOrderCancelReplaceRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }

    /**
     * The order cancel/replace request is used to change the parameters of an existing order.
     *
     * Do not use this message to cancel the remaining quantity of an outstanding order, use the Cancel Request for this
     * purpose.
     *
     * The request will only be accepted if the order can successfully be pulled back from the exchange floor without
     * executing.
     *
     * Only a limited number of fields can be changed via the cancel/replace request message. These fields are:
     *  • ExecInst
     *  • OrderQty
     *  • OrdPx
     *  • TimeInForce
     *
     * The format of the cancel request message is:
     *
     *  Tag     Field Name          Required?   Comments
     *  --------------------------------------------------------------------------------------------------------------------
     *          <Standard Header>   Y           MsgType = G
     *  37      OrderID             N           Unique identifier of original order as assigned by broker
     *  41      OrigClOrdID         Y           Unique identifier of original order as assigned by institution.
     *  11      ClOrdID             Y           Unique identifier of replacement order as assigned by institution
     *  66      ListID              N           Required for List Orders
     *  1       Account             N
     *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *  64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers
     *                                          Option)
     *  21      HandlInst           Y           Must match original order
     *  18      * ExecInst            N           Can be defined multiple times for complex orders. Replacement order will
     *                                          be created with new parameters (i.e. original order values will not be
     *                                          brought forward to replacement order unless redefined within this message).
     *  100     ExDestination       N
     *  55      Symbol              Y           Must match original order
     *  65      SymbolSfx           N
     *  48      SecurityID          N           Must match original order
     *  22      IDSource            N           Must match original order
     *  54      Side                Y           Must match original side, however, Buy and Buy Minus can be interchanged
     *                                          as well as Sell and Sell Plus
     *  38      OrderQty            Y
     *  40      OrdType             Y
     *  44      Price               N           Required for limit OrdTypes
     *  99      StopPx              N           Required for stop OrdTypes
     *  15      Currency            N           Message without currency field is interpreted as US dollars. Must match
     *                                          original order.
     *  59      TimeInForce         N           Absence of this field indicates Day order
     *  12      Commission          N
     *  13      CommType            N
     *  47      Rule80A             N           Must match original order
     *  58      Text                N
     *          <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {
        super.validate();

        return true;
    }
}
