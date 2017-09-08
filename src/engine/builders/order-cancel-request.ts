import { IOrderCancelRequestMessage } from '../../messages/order-cancel-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderCancelRequestMessageBuilder extends IBaseMessageBuilder {
    message: IOrderCancelRequestMessage;
}

// TODO: Perform field order verification here
export class OrderCancelRequestMessageBuilder extends BaseMessageBuilder implements IOrderCancelRequestMessageBuilder {

    protected _message: IOrderCancelRequestMessage = null;

    public get message(): IOrderCancelRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
