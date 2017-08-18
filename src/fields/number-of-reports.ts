import { FixIntField, IFixIntField } from './base/fix/fix-int-field';
import { Tag } from './base/tag';

export interface INumberOfReportsField extends IFixIntField {}

/**
 * Field ID (TAG): 82
 * Field Name: NoRpts
 * Format: int
 * Description: Total number of reports within series.
 */
export class NumberOfReportsField extends FixIntField implements INumberOfReportsField {

    constructor(raw: string) {
        super(Tag.NoRpts, raw);
    }

}
