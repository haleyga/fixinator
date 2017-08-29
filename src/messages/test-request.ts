import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { BaseAdministrativeMessage, IBaseAdministrativeMessage } from './base-administrative-message';

export interface ITestRequestMessage extends IBaseAdministrativeMessage {}

/**
 * The test request message is utilized to force a heartbeat from the opposing application. The test request message
 * is useful for checking sequence number or verifying communication line status. The receiving application will
 * respond to the test request message with a heartbeat. Sequence numbers are not incremented for test request messages.
 *
 * The test request format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 1
 *          <Standard Trailer>  Y
 */
export abstract class TestRequestMessage extends BaseAdministrativeMessage implements ITestRequestMessage {

    constructor(raw: string) {
        super(raw);
    }

    // Validation

    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.test_request;
    }
}
