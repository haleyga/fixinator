import { FixIntField, IFixIntField } from './base/fix/fix-int-field';
import { Tag } from './base/tag';

export interface ILinesOfTextField extends IFixIntField {}

/**
 * Field ID (TAG): 33
 * Field Name: LinesOfText
 * Format: int
 * Description: Identifies number of lines of text body
 */
export class LinesOfTextField extends FixIntField implements ILinesOfTextField {

    constructor(raw: string) {
        super(Tag.LinesOfText, raw);
    }

}
