import { FixChar } from '../../../data-types/fix-char';
import { Tag } from '../../../tag';
import { FixinatorDate, IFixinatorDate } from '../../../util/datetime';
import { FixCharField, IFixCharField } from '../fix/fix-char-field';

export interface IDateField extends IFixCharField {
    date: IFixinatorDate;
}

export abstract class DateField extends FixCharField implements IDateField {

    protected _date: IFixinatorDate = null;

    constructor(tag: Tag, raw: string) {
        super(tag, raw);
    }

    public get date(): IFixinatorDate {

        // If the value is valid, just return it.
        if (this._isValid) return this._date;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public validate(): boolean {

        try {

            // Attempt to parse the raw value.
            this._data = new FixChar(this._raw);

            this._formatted = this._data.value;

            this._date = new FixinatorDate(this._formatted);

        } catch (error) {

            // Invalidate the field if the value doesn't pass muster.
            this.invalidate(this);

            // Now rethrow the error.
            throw error;
        }

        if (this._data && this._formatted && this._date) this._isValid = true;

        return this._isValid;
    }

}
