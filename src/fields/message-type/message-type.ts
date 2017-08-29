import { ConstrainedKeyValueMap } from '../../util/util';
import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IMessageTypeField extends IConstrainedCharField {}

export const MESSAGE_TYPE_VALUES: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                                              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'];

export type MessageTypes =
    'advertisement' | 'allocation' | 'allocation_ack' | 'email' | 'execution_report' | 'heartbeat' |
    'indication_of_interest' | 'list_cancel_request' | 'list_execute' | 'list_status' | 'list_status_request' |
    'logon' | 'logout' | 'news' | 'order_cancel_reject' | 'order_cancel_replace_request' | 'order_cancel_request' |
    'order_list' | 'order_single' | 'order_status_request' | 'reject' | 'resend_request' | 'sequence_reset' |
    'test_request';

export const MESSAGE_TYPES: ConstrainedKeyValueMap<MessageTypes> = {
    advertisement               : '7',
    allocation                  : 'J',
    allocation_ack              : 'P',
    email                       : 'C',
    execution_report            : '8',
    heartbeat                   : '0',
    indication_of_interest      : '6',
    list_cancel_request         : 'K',
    list_execute                : 'L',
    list_status                 : 'N',
    list_status_request         : 'M',
    logon                       : 'A',
    logout                      : '5',
    news                        : 'B',
    order_cancel_reject         : '9',
    order_cancel_replace_request: 'G',
    order_cancel_request        : 'F',
    order_list                  : 'E',
    order_single                : 'D',
    order_status_request        : 'H',
    reject                      : '3',
    resend_request              : '2',
    sequence_reset              : '4',
    test_request                : '1',
};

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
