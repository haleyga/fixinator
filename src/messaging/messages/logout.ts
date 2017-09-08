import { Tag } from '../fields/base/tag';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import { BaseAdministrativeMessage, IBaseAdministrativeMessage } from './base-administrative-message';
import { IProtoBaseAdministrativeMessage, ProtoBaseAdministrativeMessage } from './base-administrative-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoLogoutMessage extends IProtoBaseAdministrativeMessage {
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoLogoutMessage extends ProtoBaseAdministrativeMessage implements IProtoLogoutMessage {}

export interface ILogoutMessage extends IBaseAdministrativeMessage {
    text?: ITextField;
}

/**
 * The logout message is to used to terminate the session. Disconnection without the sending of a logout message
 * should be interpreted as an abnormal condition.
 *
 * The logout format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 5
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export abstract class LogoutMessage extends BaseAdministrativeMessage implements ILogoutMessage {

    protected _text: ITextField = null;

    constructor(protoMessage: IProtoLogoutMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get text(): ITextField { return this._text; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.logout;
    }

    protected construct(protoMessage: IProtoLogoutMessage): void {
        this._text = protoMessage[Tag.Text];
    }
}
