import { IAllocationAcknowledgementMessage } from '../../messages/allocation-ack';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IAllocationAcknowledgementMessageBuilder extends IBaseMessageBuilder {
    message: IAllocationAcknowledgementMessage;
}

// TODO: Perform field order verification here
export class AllocationAcknowledgementMessageBuilder extends BaseMessageBuilder
    implements IAllocationAcknowledgementMessageBuilder {

    protected _message: IAllocationAcknowledgementMessage = null;

    public get message(): IAllocationAcknowledgementMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
