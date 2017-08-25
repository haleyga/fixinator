import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IMessageTypeField extends IConstrainedCharField {}
export const MESSAGE_TYPE_VALUES: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                                              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'];

/**
 * Field ID (TAG): 35
 * Field Name: MsgType
 * Format: char
 * Description: Defines message type. ALWAYS THIRD FIELD IN MESSAGE. (Always unencrypted).  A "U" as the first
 *              character in the MsgType field indicates that the message format is privately defined between the
 *              sender and receiver.
 *
 *              Valid values:
 *                  0 = Heartbeat
 *                  1 = Test Request
 *                  2 = Resend Request
 *                  3 = Reject
 *                  4 = Sequence Reset
 *                  5 = Logout
 *                  6 = Indication of Interest
 *                  7 = Advertisement
 *                  8 = Execution Report
 *                  9 = Order Cancel Reject
 *                  A = Logon
 *                  B = News
 *                  C = Email
 *                  D = Order - Single
 *                  E = Order - List
 *                  F = Order Cancel Request
 *                  G = Order Cancel/Replace Request
 *                  H = Order Status Request
 *                  J = Allocation
 *                  K = List Cancel Request
 *                  L = List Execute
 *                  M = List Status Request
 *                  N = List Status
 *                  P = Allocation ACK
 */
export class MessageTypeField extends ConstrainedCharField implements IMessageTypeField {

    constructor(raw: string) {
        super(Tag.MsgType, raw, MESSAGE_TYPE_VALUES);
    }

}
