import { IListCancelRequestMessage } from '../../messages/list-cancel-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IListCancelRequestMessageBuilder extends IBaseMessageBuilder {
    message: IListCancelRequestMessage;
}

// TODO: Perform field order verification here
export class ListCancelRequestMessageBuilder extends BaseMessageBuilder implements IListCancelRequestMessageBuilder {

    protected _message: IListCancelRequestMessage = null;

    public get message(): IListCancelRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
