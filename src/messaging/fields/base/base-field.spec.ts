import * as chai from 'chai';
import 'mocha';
import { IFixBaseType } from '../../data-types/fix-base-type';
import { BaseField } from './base-field';
import { Tag } from './tag';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

class BaseFieldSpec<T> extends BaseField<T> {
    public data: IFixBaseType;
    public formatted: T;

    public validate(): boolean {
        throw new Error('Method not implemented.');
    }

}

describe('base-field.spec.ts', () => {

    describe('BaseField', () => {
        it(`should return the correct base values (abstract members aren't tested here)`, (done) => {

            const baseFieldSpec = new BaseFieldSpec<string>(Tag.RawData, '1234');
            chai.expect(baseFieldSpec.raw).to.equal('1234');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.RawData);

            done();
        });
    });

});
