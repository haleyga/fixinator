import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IIoiOtherServicesField extends IConstrainedCharField {}
export const IOI_OTHER_SERVICES_VALUES: string[] = ['A', 'AB', 'B', 'BA'];

/**
 * Field ID (TAG): 24
 * Field Name: IOIOthSvc
 * Format: char
 * Description: Indicates if, and on which other services, the indication has been advertised. Each character
 *              represents an additional service (e.g. if on Bridge and Autex, field = BA, if only on Autex, field = A)
 *                  Valid values:
 *                      A = Autex
 *                      B = Bridge
 */
export class IoiOtherServicesField extends ConstrainedCharField implements IIoiOtherServicesField {

    constructor(raw: string) {
        super(Tag.IOIOthSvc, raw, IOI_OTHER_SERVICES_VALUES);
    }

}
