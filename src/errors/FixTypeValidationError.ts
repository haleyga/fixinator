import { FixinatorError } from './FixinatorError';

export class FixTypeValidationError extends FixinatorError {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
