import { ISignatureLengthField } from '../fields/signature-length/signature-length';
import { ISignatureField } from '../fields/signature/signature';
import { IChecksumField } from '../fields/checksum/checksum';

export interface IStandardTrailer {
    signatureLength?: ISignatureLengthField;
    signature?: ISignatureField;
    checkSum: IChecksumField;
}

export class StandardTrailer implements IStandardTrailer {

    protected readonly _signatureLength?: ISignatureLengthField = null;
    protected readonly _signature?: ISignatureField             = null;
    protected readonly _checkSum: IChecksumField                = null;

    public get signatureLength(): ISignatureLengthField { return this._signatureLength; }

    public get signature(): ISignatureField { return this._signature; }

    public get checkSum(): IChecksumField { return this._checkSum; }
}
