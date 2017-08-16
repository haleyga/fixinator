import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IIdSourceField extends IStringEnumField {}

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
export class IdSourceField extends StringEnumField implements IIdSourceField {

    constructor(raw: string) {
        super(Tag.IDSource, raw, {
            1: ['1', 'cusip'],
            2: ['2', 'sedol'],
            3: ['3', 'quik'],
        });
    }

}
