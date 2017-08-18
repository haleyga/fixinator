import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface IMessageTypeField extends IStringEnumField {}

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
export class MessageTypeField extends StringEnumField implements IMessageTypeField {

    constructor(raw: string) {
        super(Tag.MsgType, raw, {
            0: ['0', 'heartbeat'],
            1: ['1', 'test_request'],
            2: ['2', 'resend_request'],
            3: ['3', 'reject'],
            4: ['4', 'sequence_reset'],
            5: ['5', 'logout'],
            6: ['6', 'indication_of_interest'],
            7: ['7', 'advertisement'],
            8: ['8', 'execution_report'],
            9: ['9', 'order_cancel_reject'],
            A: ['A', 'logon'],
            B: ['B', 'news'],
            C: ['C', 'email'],
            D: ['D', 'order_single'],
            E: ['E', 'order_list'],
            F: ['F', 'order_cancel_request'],
            G: ['G', 'order_cancel_replace_request'],
            H: ['H', 'order_status_request'],
            J: ['J', 'allocation'],
            K: ['K', 'list_cancel_request'],
            L: ['L', 'list_execute'],
            M: ['M', 'list_status_request'],
            N: ['N', 'list_status'],
            P: ['P', 'allocation_acknowledgement'],
            U: ['U', 'private'],
        });
    }

}
