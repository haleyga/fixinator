
import { IBaseMessage } from '../messages/base-message';
import { IHeartbeatMessage } from '../messages/heartbeat';

export interface IHeartbeatMessageBuilder {
    message: IHeartbeatMessage;
}

// TODO: Perform field order verification here
export  class HeartbeatMessageBuilder implements IHeartbeatMessageBuilder {

    protected _message: IHeartbeatMessage = null;

    public get message(): IHeartbeatMessage { return this._message; }

    public parseField(): boolean {
        return true;
    }
}
