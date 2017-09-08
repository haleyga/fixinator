import { ILogoutMessage } from '../../messages/logout';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface ILogoutMessageBuilder extends IBaseMessageBuilder {
    message: ILogoutMessage;
}

// TODO: Perform field order verification here
export class LogoutMessageBuilder extends BaseMessageBuilder implements ILogoutMessageBuilder {

    protected _message: ILogoutMessage = null;

    public get message(): ILogoutMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
