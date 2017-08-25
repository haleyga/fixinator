import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

export interface ICancelOrderRequestIdField extends IFixCharField {}

/**
 * Field ID (TAG): 101
 * Field Name: CxlOrdReqId
 * Format: char
 * Description: Unique ID of cancel request.
 */
export class CancelOrderRequestIdField extends FixCharField implements ICancelOrderRequestIdField {

    constructor(raw: string) {
        super(Tag.CxlOrdReqId, raw);
    }

}
