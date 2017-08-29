import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import { BaseAdministrativeMessage, IBaseAdministrativeMessage } from './base-administrative-message';

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

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get text(): ITextField { return this._text; }

    public set text(field: ITextField) { this._text = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.logout;
    }
}
