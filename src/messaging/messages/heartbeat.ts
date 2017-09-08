import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import {
    BaseAdministrativeMessage, IBaseAdministrativeMessage, IProtoBaseAdministrativeMessage,
    ProtoBaseAdministrativeMessage,
} from './base-administrative-message';

export interface IProtoHeartbeatMessage extends IProtoBaseAdministrativeMessage {}

export class ProtoHeartbeatMessage extends ProtoBaseAdministrativeMessage implements IProtoHeartbeatMessage {}

export interface IHeartbeatMessage extends IBaseAdministrativeMessage {}

/**
 * When message traffic is light, the sending application will generate heartbeat messages at regular time intervals.
 * The heartbeat will consist of the standard message header and trailer and will contain the next sequence number to
 * be transmitted. The heartbeat is useful for identifying when the last of a string of messages are lost and for
 * monitoring the status of the communication link.
 *
 * The heartbeat is generated only when no regular message has been transmitted within the heartbeat interval. The
 * heartbeat interval timer will be reset each time a regular message is transmitted. The interval value will be
 * individually determined for each connection.
 *
 * The standard message header is utilized for heartbeats with following provisions:
 *  • The MsgType field is set to "0"
 *  • The sequence number field contains the next message sequence number to be transmitted
 *  • The sequence number is NOT incremented for heartbeats
 *  • The SenderSubID, TargetSubID, SecureDataLen, SecureData, PossResendFlag and PossDup fields are not required.
 *
 * Format:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 0
 *                                          MsgSeqNo contains expected next seq num; i.e. last sequence number + 1
 *          <Standard Trailer>  Y
 */
export class HeartbeatMessage extends BaseAdministrativeMessage implements IHeartbeatMessage {

    constructor(protoMessage: IProtoHeartbeatMessage) {
        super(protoMessage);
    }

    // Validation

    // TODO: validate message more completely
    /**
     * MsgType = 0
     * MsgSeqNo contains expected next sequence number; i.e. last sequence number + 1
     *
     * @returns {boolean}
     */
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.heartbeat;
    }
}
