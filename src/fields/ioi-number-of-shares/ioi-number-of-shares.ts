import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IIoiNumberOfSharesField extends IConstrainedCharField {}
export const IOI_NUMBER_OF_SHARES_VALUES: string[] = ['0', 'S', 'M', 'L'];

/**
 * Field ID (TAG): 27
 * Field Name: IOIShares
 * Format: char
 * Description: Number of shares in numeric or relative size.
 *                  Valid values:
 *                      0 - 1000000000
 *                      S = Small
 *                      M = Medium
 *                      L = Large
 */
export class IoiNumberOfSharesField extends ConstrainedCharField implements IIoiNumberOfSharesField {

    constructor(raw: string) {
        super(Tag.IOIShares, raw, IOI_NUMBER_OF_SHARES_VALUES);
    }

}
