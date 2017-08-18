import { INumberEnumField, NumberEnumField } from './base/custom/number-enum-field';
import { Tag } from './base/tag';


export interface IAllocationStatusField extends INumberEnumField {}

/**
 * Field ID (TAG): 87
 * Field Name: AllocStatus
 * Format: int
 * Description: Identifies status of allocation.
 *
 *              Valid values:
 *                  0 = accepted
 *                  1 = rejected
 *                  2 = partial accept
 */
export class AllocationStatusField extends NumberEnumField implements IAllocationStatusField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.AllocStatus, raw, {
            0: [0, 'accepted'],
            1: [1, 'rejected'],
            2: [2, 'partial_accept'],
        });
    }

}
