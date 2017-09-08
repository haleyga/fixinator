import { BaseMessage, IBaseMessage, IProtoBaseMessage, ProtoBaseMessage } from './base-message';

export interface IProtoBaseAdministrativeMessage extends IProtoBaseMessage {}

export class ProtoBaseAdministrativeMessage extends ProtoBaseMessage implements IProtoBaseAdministrativeMessage {}

export interface IBaseAdministrativeMessage extends IBaseMessage {}

/**
 * The administrative class of messages are intended to address the utility needs of the protocol. The following
 * section describes the use of each message and provides the message layout. Administrative messages will be
 * generated from both the broker and institution sides of the connection.
 */
export abstract class BaseAdministrativeMessage extends BaseMessage implements IBaseAdministrativeMessage {

    constructor(protoMessage: IProtoBaseAdministrativeMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    protected construct(protoMessage: IProtoBaseAdministrativeMessage): void {
        super.construct(protoMessage);
    }

}
