import { ITestRequestMessage } from '../../messages/test-request';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface ITestRequestMessageBuilder extends IBaseMessageBuilder {
    message: ITestRequestMessage;
}

// TODO: Perform field order verification here
export class TestRequestMessageBuilder extends BaseMessageBuilder implements ITestRequestMessageBuilder {

    protected _message: ITestRequestMessage = null;

    public get message(): ITestRequestMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
