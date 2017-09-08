import { BoundedIntField, IBoundedIntField } from '../base/custom/bounded-field/bounded-int-field';
import { Tag } from '../base/tag';

export interface IBodyLengthField extends IBoundedIntField {}

export const MIN_BODY_LENGTH: number = 0;
export const MAX_BODY_LENGTH: number = 9999;

/**
 * Field ID (TAG): 9
 * Field Name: BodyLength
 * Format: int
 * Description: Message bodyLength, in bytes, forward to the CheckSum field.
 *                  ALWAYS SECOND FIELD IN MESSAGE. (Always unencrypted)
 *                      Valid values: 0 - 9999
 */
export class BodyLengthField extends BoundedIntField implements IBodyLengthField {

    constructor(raw: string) {
        super(Tag.BodyLength, raw, MIN_BODY_LENGTH, MAX_BODY_LENGTH);
    }

    // TODO: add validation to ensure field is the second in a record (maybe it doesn't belong in this class though)
//    public validate(): boolean {}

}
