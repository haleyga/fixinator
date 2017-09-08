import { IExecutionReportMessage } from '../../messages/execution-report';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IExecutionReportMessageBuilder extends IBaseMessageBuilder {
    message: IExecutionReportMessage;
}

// TODO: Perform field order verification here
export class ExecutionReportMessageBuilder extends BaseMessageBuilder implements IExecutionReportMessageBuilder {

    protected _message: IExecutionReportMessage = null;

    public get message(): IExecutionReportMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
