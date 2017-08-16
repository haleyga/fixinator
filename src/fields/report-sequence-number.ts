import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IReportSequenceNumberField extends IFixIntField {}

/**
 * Field ID (TAG): 82
 * Field Name: RptSeq
 * Format: int
 * Description: Sequence number of message within report series.
 */
export class ReportSequenceNumberField extends FixIntField implements IReportSequenceNumberField {

    constructor(raw: string) {
        super(Tag.RptSeq, raw);
    }

}
