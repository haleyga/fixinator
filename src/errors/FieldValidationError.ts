import { FixinatorError } from './FixinatorError';

export class FieldValidationError extends FixinatorError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        if (new.target) Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
