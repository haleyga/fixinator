
import { MESSAGE_TYPES, MessageTypes } from '../fields/message-type/message-type';
import { IBaseMessageBuilder } from './base-message-builder';
import { FixinatorError } from '../errors/FixinatorError';
import { HeartbeatMessageBuilder } from './heartbeat';

export abstract class MessageBuilder {
    public static getBuilder(messageType: MessageTypes): IBaseMessageBuilder {
        switch (messageType) {
            case MESSAGE_TYPES.allocation:
                break;
            case MESSAGE_TYPES.heartbeat:
                return new HeartbeatMessageBuilder();
            default:
                throw new FixinatorError();
        }
    }
}
