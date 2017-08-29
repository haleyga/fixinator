
import { BaseMessage, IBaseMessage } from './base-message';

export interface IBaseApplicationMessage extends IBaseMessage {}

/**
 * The exchange of business information is accomplished through the passing of application messages. The application
 * message is composed of the standard header followed by the message body and trailer.
 */
export abstract class BaseApplicationMessage extends BaseMessage implements IBaseApplicationMessage {

    constructor(raw: string) {
        super(raw);
    }

}
