import { Tag } from '../base/tag';
import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';

//TODO: Constrain this field (the list is long, all stocks/bonds/etc symbols are allowed - long list)
//export interface ISymbolSuffixField extends IConstrainedCharField {}
export interface ISymbolSuffixField extends IFixCharField {}

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
//export class SymbolSuffixField extends ConstrainedCharField implements ISymbolSuffixField {
//
//    constructor(raw: string) {
//        super(Tag.SymbolSfx, raw, {});
//    }
//
//    // TODO: See validation notes in class description
////    public validate(): boolean {}
//}
export class SymbolSuffixField extends FixCharField implements ISymbolSuffixField {
    constructor(raw: string) {
        super(Tag.SymbolSfx, raw);
    }
}
