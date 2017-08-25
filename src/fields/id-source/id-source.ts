import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IIdSourceField extends IConstrainedCharField {}
export const ID_SOURCE_VALUES: string[] = ['1', '2', '3'];

/**
 * Field ID (TAG): 22
 * Field Name: IDSource
 * Format: char
 * Description: Identifies class of alternative SecurityID
 *                  Valid values:
 *                      1 = CUSIP
 *                      2 = SEDOL
 *                      3 = QUIK
 */
export class IdSourceField extends ConstrainedCharField implements IIdSourceField {

    constructor(raw: string) {
        super(Tag.IDSource, raw, ID_SOURCE_VALUES);
    }

}
