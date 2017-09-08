import { IIndicationOfInterestMessage } from '../../messages/indication-of-interest';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IIndicationOfInterestMessageBuilder extends IBaseMessageBuilder {
    message: IIndicationOfInterestMessage;
}

// TODO: Perform field order verification here
export class IndicationOfInterestMessageBuilder extends BaseMessageBuilder
    implements IIndicationOfInterestMessageBuilder {

    protected _message: IIndicationOfInterestMessage = null;

    public get message(): IIndicationOfInterestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
