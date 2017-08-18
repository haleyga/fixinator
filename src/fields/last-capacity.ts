import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface ILastCapacityField extends IStringEnumField {}

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
export class LastCapacityField extends StringEnumField implements ILastCapacityField {

    constructor(raw: string) {
        super(Tag.LastCapacity, raw, {
            1: ['1', 'agent'],
            2: ['2', 'cross_as_agent'],
            3: ['3', 'cross_as_principal'],
            4: ['4', 'principal'],
        });
    }

}
