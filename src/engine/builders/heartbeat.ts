import { IHeartbeatMessage } from '../../messages/heartbeat';
import { BaseMessageBuilder, IBaseMessageBuilder } from './base-message-builder';

export interface IHeartbeatMessageBuilder extends IBaseMessageBuilder {
    message: IHeartbeatMessage;
}

// TODO: Perform field order verification here
export class HeartbeatMessageBuilder extends BaseMessageBuilder implements IHeartbeatMessageBuilder {

    protected _message: IHeartbeatMessage = null;

    public get message(): IHeartbeatMessage { return this._message; }

    public parseField(): number {
        return 0;
    }
}
