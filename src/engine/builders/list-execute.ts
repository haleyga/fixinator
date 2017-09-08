import { IListExecuteMessage } from '../../messages/list-execute';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IListExecuteMessageBuilder extends IBaseMessageBuilder {
    message: IListExecuteMessage;
}

// TODO: Perform field order verification here
export class ListExecuteMessageBuilder extends BaseMessageBuilder implements IListExecuteMessageBuilder {

    protected _message: IListExecuteMessage = null;

    public get message(): IListExecuteMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
