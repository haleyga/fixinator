import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';
import { ConstrainedKeyToStringMap } from '../../../util/util';

export interface IExecutionTransactionTypeField extends IConstrainedCharField {}

export const EXECUTION_TRANSACTION_TYPE_VALUES: string[] = ['0', '1', '2', '3'];

export type ExecutionTransactionType = 'new' | 'cancel' | 'correct' | 'status';
export const EXECUTION_TRANSACTION_TYPE: ConstrainedKeyToStringMap<ExecutionTransactionType> = {
    cancel : '1',
    correct: '2',
    new    : '0',
    status : '3',
};

/**
 * Field ID (TAG): 20
 * Field Name: ExecTransType
 * Format: char
 * Description: Identifies transaction type
 *              Valid values:
 *                  0 = New
 *                  1 = Cancel
 *                  2 = Correct
 *                  3 = Status
 */
export class ExecutionTransactionTypeField extends ConstrainedCharField implements IExecutionTransactionTypeField {

    constructor(raw: string) {
        super(Tag.ExecTransType, raw, EXECUTION_TRANSACTION_TYPE_VALUES);
    }

}
