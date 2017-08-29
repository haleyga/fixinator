
import { IBaseMessage } from '../messages/base-message';

export interface IBaseMessageBuilder {
    message: IBaseMessage;
    parseField(): boolean;
}

// TODO: Perform field order verification here
export abstract class BaseMessageBuilder implements IBaseMessageBuilder {

    protected _message: IBaseMessage = null;

    public get message(): IBaseMessage { return this._message; }

    public abstract parseField(): boolean;
}
