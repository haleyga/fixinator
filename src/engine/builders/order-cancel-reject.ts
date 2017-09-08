import { IOrderCancelRejectMessage } from '../../messages/order-cancel-reject';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderCancelRejectMessageBuilder extends IBaseMessageBuilder {
    message: IOrderCancelRejectMessage;
}

// TODO: Perform field order verification here
export class OrderCancelRejectMessageBuilder extends BaseMessageBuilder implements IOrderCancelRejectMessageBuilder {

    protected _message: IOrderCancelRejectMessage = null;

    public get message(): IOrderCancelRejectMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
