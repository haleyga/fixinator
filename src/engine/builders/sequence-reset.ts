import { ISequenceResetMessage } from '../../messages/sequence-reset';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface ISequenceResetMessageBuilder extends IBaseMessageBuilder {
    message: ISequenceResetMessage;
}

// TODO: Perform field order verification here
export class SequenceResetMessageBuilder extends BaseMessageBuilder implements ISequenceResetMessageBuilder {

    protected _message: ISequenceResetMessage = null;

    public get message(): ISequenceResetMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
