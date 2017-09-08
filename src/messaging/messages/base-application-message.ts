
import { BaseMessage, IBaseMessage, IProtoBaseMessage, ProtoBaseMessage } from './base-message';

export interface IProtoBaseApplicationMessage extends IProtoBaseMessage {}

export class ProtoBaseApplicationMessage extends ProtoBaseMessage implements IProtoBaseApplicationMessage {}

export interface IBaseApplicationMessage extends IBaseMessage {}

/**
 * The exchange of business information is accomplished through the passing of application messages. The application
 * message is composed of the standard header followed by the message body and trailer.
 */
export abstract class BaseApplicationMessage extends BaseMessage implements IBaseApplicationMessage {

    constructor(protoMessage: IProtoBaseApplicationMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    protected construct(protoMessage: IProtoBaseApplicationMessage): void {
        super.construct(protoMessage);
    }

}
