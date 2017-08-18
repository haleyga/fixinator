import { FixCharField, IFixCharField } from '../base/fix/fix-char-field';
import { Tag } from '../base/tag';

export interface IListExecutionInstructionsField extends IFixCharField {}

/**
 * Field ID (TAG): 69
 * Field Name: ListExecInst
 * Format: char
 * Description: Free format text message containing list handling and execution instructions.
 */
export class ListExecutionInstructionsField extends FixCharField implements IListExecutionInstructionsField {

    constructor(raw: string) {
        super(Tag.ListExecInst, raw);
    }

}
