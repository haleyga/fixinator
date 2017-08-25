
export class  FixinatorError extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        if (new.target) Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}
