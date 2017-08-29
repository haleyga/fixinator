import { BaseApplicationMessage } from '../../dist/es6/src/messages/application-message';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import { IBaseApplicationMessage } from './base-application-message';

export interface IListStatusRequestMessage extends IBaseApplicationMessage {
    listId: IListIdField;
    text?: ITextField;
}

/**
 * The list status request message type is used by institutions to instruct the broker to generate status messages
 * for a list.
 *
 * The format for the list - status request message is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = M
 *  66      ListID              Y
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class ListStatusRequestMessage extends BaseApplicationMessage implements IListStatusRequestMessage {

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

        return this._msgType.formatted === MESSAGE_TYPES.list_status_request;
    }
}
