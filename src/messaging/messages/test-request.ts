import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import {
    BaseAdministrativeMessage, IBaseAdministrativeMessage, IProtoBaseAdministrativeMessage,
    ProtoBaseAdministrativeMessage,
} from './base-administrative-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoTestRequestMessage extends IProtoBaseAdministrativeMessage {}

// tslint:enable:no-magic-numbers

export class ProtoTestRequestMessage extends ProtoBaseAdministrativeMessage implements IProtoTestRequestMessage {}

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
export class TestRequestMessage extends BaseAdministrativeMessage implements ITestRequestMessage {

    constructor(protoMessage: IProtoTestRequestMessage) {
        super(protoMessage);
    }

    // Validation

    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.test_request;
    }
}
