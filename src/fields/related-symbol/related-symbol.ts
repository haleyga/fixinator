import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

export interface IRelatedSymbolField extends IFixCharField {}

/**
 * Field ID (TAG): 46
 * Field Name: RelatdSym
 * Format: char
 * Description: Symbol of issue related to story. Can be repeated within message to identify multiple companies.
 */
export class RelatedSymbolField extends FixCharField implements IRelatedSymbolField {

    constructor(raw: string) {
        super(Tag.RelatdSym, raw);
    }

}
