import { Tag } from '../tag';
import { BoundedIntField, IBoundedIntField } from './base/custom/bounded-int';

export interface INewSequenceNumberField extends IBoundedIntField {}

export const MIN_SEQUENCE_NUMBER: number = 0;
export const MAX_SEQUENCE_NUMBER: number = 99999;

/**
 * Field ID (TAG): 45
 * Field Name: RefSeqNum
 * Format: int
 * Description: Reference sequence number
 *
 *              Valid values: 0 - 99999
 */
export class NewSequenceNumberField extends BoundedIntField implements INewSequenceNumberField {

    constructor(raw: string) {
        super(Tag.NewSeqNo, raw, MIN_SEQUENCE_NUMBER, MAX_SEQUENCE_NUMBER);
    }

}
