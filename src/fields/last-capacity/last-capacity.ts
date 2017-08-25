import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ILastCapacityField extends IConstrainedCharField {}
export const LAST_CAPACITY_VALUES: string[] = ['1', '2', '3', '4'];

/**
 * Field ID (TAG): 29
 * Field Name: LastCapacity
 * Format: char
 * Description: Broker capacity in order execution
 *
 *              Valid values:
 *                  1 = Agent
 *                  2 = Cross as agent
 *                  3 = Cross as principal
 *                  4 = Principal
 */
export class LastCapacityField extends ConstrainedCharField implements ILastCapacityField {

    constructor(raw: string) {
        super(Tag.LastCapacity, raw, LAST_CAPACITY_VALUES);
    }

}
