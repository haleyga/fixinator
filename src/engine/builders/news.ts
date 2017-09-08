import { INewsMessage } from '../../messages/news';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface INewsMessageBuilder extends IBaseMessageBuilder {
    message: INewsMessage;
}

// TODO: Perform field order verification here
export class NewsMessageBuilder extends BaseMessageBuilder implements INewsMessageBuilder {

    protected _message: INewsMessage = null;

    public get message(): INewsMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
