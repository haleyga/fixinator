import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IExecutionIdField extends IFixIntField {}

/**
 * Field ID (TAG): 17
 * Field Name: ExecID
 * Format: int
 * Description: Unique identifier of execution message (Will be blank for OrdStat messages)
 */
export class ExecutionIdField extends FixIntField implements IExecutionIdField {

    constructor(raw: string) {
        super(Tag.ExecID, raw);
    }

}
