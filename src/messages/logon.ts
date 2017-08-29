import { IEncryptionMethodField } from '../fields/encryption-method/encryption-method';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { BaseAdministrativeMessage, IBaseAdministrativeMessage } from './base-administrative-message';

export interface ILogonMessage extends IBaseAdministrativeMessage {
    encryptMethod: IEncryptionMethodField;
}

/**
 * The logon message is utilized authenticate a user attempting to establish a connection to a remote system. The
 * logon message must be the first message sent by the connecting application.
 *
 * The logon format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = A
 *  98      EncryptMethod       Y           (Always unencrypted)
 *          <Standard Trailer>  Y
 */
export abstract class LogonMessage extends BaseAdministrativeMessage implements ILogonMessage {

    protected _encryptMethod: IEncryptionMethodField = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get encryptMethod(): IEncryptionMethodField { return this._encryptMethod; }

    public set encryptMethod(field: IEncryptionMethodField) { this._encryptMethod = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.logon;
    }
}
