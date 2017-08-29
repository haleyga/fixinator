import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface IListCancelRequestMessage extends IBaseApplicationMessage {
    listId: IListIdField;
    text?: ITextField;
}

/**
 * The list cancel request message type is used by institutions wishing to cancel previously submitted lists either
 * before or during execution.
 *
 * After the list has been staged with the broker, it can be cancelled via the submission of the List Cancel
 * message. If the list has not yet been submitted for execution, the List Cancel message will instruct the broker
 * not to execute it, if the list is being executed, the List Cancel message should trigger the broker's system to
 * generate cancel requests for the remaining quantities of each order within the list. Individual orders within the
 * list can be cancelled via the Order Cancel Request message.
 *
 * The format for the list - cancel request message is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = K
 *  66      ListID              Y
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class ListStatusRequestMessage extends BaseApplicationMessage implements IListCancelRequestMessage {

    private _listId: IListIdField = null;
    private _text: ITextField     = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get listId(): IListIdField {
        return this._listId;
    }

    public set listId(value: IListIdField) {
        this._listId = value;
    }

    public get text(): ITextField {
        return this._text;
    }

    public set text(value: ITextField) {
        this._text = value;
    }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.list_cancel_request;
    }
}
