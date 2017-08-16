import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IIoiQualityOfIndicationField extends IStringEnumField {}

/**
 * Field ID (TAG): 25
 * Field Name: IOIQltyInd
 * Format: char
 * Description: Relative quality of formatted
 *                  Valid values:
 *                      L = Low
 *                      M = Medium
 *                      H = High
 */
export class IoiQualityOfIndicationField extends StringEnumField implements IIoiQualityOfIndicationField {

    constructor(raw: string) {
        super(Tag.IOIQltyInd, raw, {
            H: ['H', 'high'],
            L: ['L', 'low'],
            M: ['M', 'medium'],
        });
    }

}
