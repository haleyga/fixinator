import { IListStatusRequestMessage } from '../../messages/list-status-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IListStatusRequestMessageBuilder extends IBaseMessageBuilder {
    message: IListStatusRequestMessage;
}

// TODO: Perform field order verification here
export class ListStatusRequestMessageBuilder extends BaseMessageBuilder implements IListStatusRequestMessageBuilder {

    protected _message: IListStatusRequestMessage = null;

    public get message(): IListStatusRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
