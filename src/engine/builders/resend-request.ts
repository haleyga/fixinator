import { IResendRequestMessage } from '../../messages/resend-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IResendRequestMessageBuilder extends IBaseMessageBuilder {
    message: IResendRequestMessage;
}

// TODO: Perform field order verification here
export class ResendRequestMessageBuilder extends BaseMessageBuilder implements IResendRequestMessageBuilder {

    protected _message: IResendRequestMessage = null;

    public get message(): IResendRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
