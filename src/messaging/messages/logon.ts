import { Tag } from '../fields/base/tag';
import { IEncryptionMethodField } from '../fields/encryption-method/encryption-method';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import {
    BaseAdministrativeMessage, IBaseAdministrativeMessage, ProtoBaseAdministrativeMessage,
} from './base-administrative-message';
import { IProtoBaseApplicationMessage } from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoLogonMessage extends IProtoBaseApplicationMessage {
    98: IEncryptionMethodField;
}

//tslint:enable:no-magic-numbers

export class ProtoLogonMessage extends ProtoBaseAdministrativeMessage
    implements IProtoLogonMessage
{
    public 98: IEncryptionMethodField = null;
}

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
export class LogonMessage extends BaseAdministrativeMessage implements ILogonMessage {

    protected _encryptMethod: IEncryptionMethodField = null;

    constructor(protoMessage: IProtoLogonMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get encryptMethod(): IEncryptionMethodField { return this._encryptMethod; }

    public set encryptMethod(field: IEncryptionMethodField) { this._encryptMethod = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.logon;
    }

    protected construct(protoMessage: IProtoLogonMessage): void {
        this._encryptMethod = protoMessage[Tag.EncryptMethod];
    }
}
