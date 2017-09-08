import { IRejectMessage } from '../../messages/reject';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IRejectMessageBuilder extends IBaseMessageBuilder {
    message: IRejectMessage;
}

// TODO: Perform field order verification here
export class RejectMessageBuilder extends BaseMessageBuilder implements IRejectMessageBuilder {

    protected _message: IRejectMessage = null;

    public get message(): IRejectMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
