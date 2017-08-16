import { Tag } from '../tag';
import { INumberEnumField, NumberEnumField } from './base/custom/number-enum-field';

export interface IEncryptionMethodField extends INumberEnumField {}

/**
 * Field ID (TAG): 98
 * Field Name: EncryptMethod
 * Format: int
 * Description: Method of encryption.
 *
 *              Valid values:
 *                  0 = None
 *                  1 = PKCS
 *                  2 = DES
 *                  3 = PKCS/DES
 */
export class EncryptionMethodField extends NumberEnumField implements IEncryptionMethodField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.EncryptMethod, raw, {
            0: [0, 'none'],
            1: [1, 'pkcs'],
            2: [2, 'des'],
            3: [3, 'pkcs/des'],
        });
    }

}
