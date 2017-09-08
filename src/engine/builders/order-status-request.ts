import { IOrderStatusRequestMessage } from '../../messages/order-status-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderStatusRequestMessageBuilder extends IBaseMessageBuilder {
    message: IOrderStatusRequestMessage;
}

// TODO: Perform field order verification here
export class OrderStatusRequestMessageBuilder extends BaseMessageBuilder implements IOrderStatusRequestMessageBuilder {

    protected _message: IOrderStatusRequestMessage = null;

    public get message(): IOrderStatusRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
