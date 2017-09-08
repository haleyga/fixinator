import { IEmailMessage } from '../../messages/email';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IEmailMessageBuilder extends IBaseMessageBuilder {
    message: IEmailMessage;
}

// TODO: Perform field order verification here
export class EmailMessageBuilder extends BaseMessageBuilder implements IEmailMessageBuilder {

    protected _message: IEmailMessage = null;

    public get message(): IEmailMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
