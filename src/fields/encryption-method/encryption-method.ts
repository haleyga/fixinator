import { ConstrainedIntField, IConstrainedIntField } from '../base/custom/constrained-field/constrained-int-field';
import { Tag } from '../base/tag';

export interface IEncryptionMethodField extends IConstrainedIntField {}

//tslint:disable:no-magic-numbers
export const ENCRYPTION_METHOD_VALUES: number[] = [0, 1, 2, 3];
//tslint:enable:no-magic-numbers

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
export class EncryptionMethodField extends ConstrainedIntField implements IEncryptionMethodField {

    constructor(raw: string) {
        super(Tag.EncryptMethod, raw, ENCRYPTION_METHOD_VALUES);
    }

}
