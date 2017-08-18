import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IIoiOtherServicesField extends IStringEnumField {}

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
export class IoiOtherServicesField extends StringEnumField implements IIoiOtherServicesField {

    constructor(raw: string) {
        super(Tag.IOIOthSvc, raw, {
            A:  ['A', 'autex'],
            AB: ['AB', 'autex_and_bridge'],
            B:  ['B', 'bridge'],
        });
    }

}
