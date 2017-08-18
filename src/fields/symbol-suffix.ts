import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface ISymbolSuffixField extends IStringEnumField {}

/**
 * Field ID (TAG): 65
 * Field Name: SymbolSfx
 * Format: char
 * Description: Additional information about the security (e.g. preferred, warrants, etc.). Absence of this field
 *              indicates common.
 *
 *              Valid values:
 *                  As defined in the NYSE Stock and bond Symbol Directory and in the AMEX Fitch Directory
 */
export class SymbolSuffixField extends StringEnumField implements ISymbolSuffixField {

    constructor(raw: string) {
        super(Tag.SymbolSfx, raw, {});
    }

    // TODO: See validation notes in class description
//    public validate(): boolean {}
}
