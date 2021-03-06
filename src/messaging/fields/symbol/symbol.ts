import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

/**
 * Empty interface just used for typing.
 */
export interface ISymbolField extends IFixCharField {}

/**
 * Field ID (TAG): 55
 * Field Name: Symbol
 * Format: char
 * Description: Ticker symbol
 */
export class SymbolField extends FixCharField implements ISymbolField {

    constructor(raw: string) {
        super(Tag.Symbol, raw);
    }

}
