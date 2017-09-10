import { ConstrainedIntField, IConstrainedIntField } from '../base/custom/constrained-field/constrained-int-field';
import { Tag } from '../base/tag';
import { ConstrainedKeyToNumberMap } from '../../../util/util';


export interface IAllocationStatusField extends IConstrainedIntField {}

//tslint:disable:no-magic-numbers
export const ALLOCATION_STATUS_VALUES: number[] = [0, 1, 2];

export type AllocationStatus = 'accepted' | 'rejected' | 'partial_accept';
export const ALLOCATION_STATUS: ConstrainedKeyToNumberMap<AllocationStatus> = {
    accepted      : 0,
    partial_accept: 2,
    rejected      : 1,
};

//tslint:enable:no-magic-numbers

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
export class AllocationStatusField extends ConstrainedIntField implements IAllocationStatusField {

    constructor(raw: string) {
        super(Tag.AllocStatus, raw, ALLOCATION_STATUS_VALUES);
    }

}
