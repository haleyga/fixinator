import { FixIntField, IFixIntField } from './base/fix/fix-int-field';
import { Tag } from './base/tag';

export interface IExecutionReferenceIdField extends IFixIntField {}

/**
 * Field ID (TAG): 19
 * Field Name: ExecRefID
 * Format: int
 * Description: Unique identifier of execution message (Will be blank for OrdStat messages)
 */
export class ExecutionReferenceIdField extends FixIntField implements IExecutionReferenceIdField {

    constructor(raw: string) {
        super(Tag.ExecRefID, raw);
    }

}
