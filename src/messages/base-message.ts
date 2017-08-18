import { IStandardHeader } from './standard-header';
import { IStandardTrailer } from './standard-trailer';

export interface IBaseMessage {}

export abstract class BaseMessage implements IBaseMessage {

    protected _raw: string                      = null;
    protected _standerHeader: IStandardHeader   = null;
    protected _standerTrailer: IStandardTrailer = null;

    constructor(raw: string) {
        this._raw = raw;
    }

}
