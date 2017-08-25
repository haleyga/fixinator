import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IIoiQualityOfIndicationField extends IConstrainedCharField {}
export const IOI_QUALITY_OF_INDICATION_VALUES: string[] = ['L', 'M', 'H'];

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
export class IoiQualityOfIndicationField extends ConstrainedCharField implements IIoiQualityOfIndicationField {

    constructor(raw: string) {
        super(Tag.IOIQltyInd, raw, IOI_QUALITY_OF_INDICATION_VALUES);
    }

}
