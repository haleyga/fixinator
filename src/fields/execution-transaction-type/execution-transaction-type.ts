import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface IExecutionTransactionTypeField extends IStringEnumField {}

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
export class ExecutionTransactionTypeField extends StringEnumField implements IExecutionTransactionTypeField {

    constructor(raw: string) {
        super(Tag.ExecTransType, raw, {
            0: ['0', 'new'],
            1: ['1', 'cancel'],
            2: ['2', 'correct'],
            3: ['3', 'status'],
        });
    }

}
