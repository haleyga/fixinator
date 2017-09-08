import { FixinatorTime, IFixinatorTime } from '../../../../../util/datetime';
import { FixChar } from '../../../../data-types/fix-char';
import { FixCharField, IFixCharField } from '../../fix/fix-char-field/fix-char-field';
import { Tag } from '../../tag';

export interface ITimeField extends IFixCharField {
    time: IFixinatorTime;
}

export abstract class TimeField extends FixCharField implements ITimeField {

    protected _time: IFixinatorTime = null;

    constructor(tag: Tag, raw: string) {
        super(tag, raw);
    }

    public get time(): IFixinatorTime {

        // If the value is valid, just return it.
        if (this._isValid) return this._time;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public validate(): boolean {

        try {

            // Attempt to parse the raw value.
            this._data = new FixChar(this._raw);

            this._formatted = this._data.value;

            this._time = new FixinatorTime(this._formatted);

        } catch (error) {

            // Invalidate the field if the value doesn't pass muster.
            this.invalidate(this);

            // Now rethrow the error.
            throw error;
        }

        if (this._data && this._formatted !== null && this._time) this._isValid = true;

        return this._isValid;
    }
}
