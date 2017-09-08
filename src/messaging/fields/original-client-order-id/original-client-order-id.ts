import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

export interface IOriginalClientOrderIdField extends IFixCharField {}

/**
 * Field ID (TAG): 41
 * Field Name: OrigClOrdID
 * Format: char
 * Description: Original order id as assigned by the institution, used to identify original order in cancel/replace
 *              requests.
 */
export class OriginalClientOrderIdField extends FixCharField implements IOriginalClientOrderIdField {

    constructor(raw: string) {
        super(Tag.OrigClOrdID, raw);
    }

}
