import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IIoiNumberOfSharesField extends IStringEnumField {}

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
export class IoiNumberOfSharesField extends StringEnumField implements IIoiNumberOfSharesField {

    constructor(raw: string) {
        super(Tag.IOIShares, raw, {
            0: ['0', '1000000000'],
            L: ['L', 'large'],
            M: ['M', 'medium'],
            S: ['S', 'small'],
        });
    }

}
