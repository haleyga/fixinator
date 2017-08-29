
import { BaseMessage, IBaseMessage } from './base-message';

export interface IBaseAdministrativeMessage extends IBaseMessage {}

/**
 * The administrative class of messages are intended to address the utility needs of the protocol. The following
 * section describes the use of each message and provides the message layout. Administrative messages will be
 * generated from both the broker and institution side of the connection.
 */
export abstract class BaseAdministrativeMessage extends BaseMessage implements IBaseAdministrativeMessage {

    constructor(raw: string) {
        super(raw);
    }

}
