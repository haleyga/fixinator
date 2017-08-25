import { BoundedIntField, IBoundedIntField } from '../base/custom/bounded-field/bounded-int-field';
import { Tag } from '../base/tag';

export interface ISharesField extends IBoundedIntField {}

export const MIN_COUNT: number = 0;
export const MAX_COUNT: number = 1000000000;

/**
 * Field ID (TAG): 53
 * Field Name: Shares
 * Format: int
 * Description: Number of shares
 *
 *              Valid values:
 *                  0 - 1000000000
 */
export class SharesField extends BoundedIntField implements ISharesField {

    constructor(raw: string) {
        super(Tag.Shares, raw, MIN_COUNT, MAX_COUNT);
    }

}
