import { ILogonMessage } from '../../messages/logon';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface ILogonMessageBuilder extends IBaseMessageBuilder {
    message: ILogonMessage;
}

// TODO: Perform field order verification here
export class LogonMessageBuilder extends BaseMessageBuilder implements ILogonMessageBuilder {

    protected _message: ILogonMessage = null;

    public get message(): ILogonMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
