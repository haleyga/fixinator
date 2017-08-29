import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface IListExecuteMessage extends IBaseApplicationMessage {
    listId: IListIdField;
    text?: ITextField;
}

/**
 * The list execute message type is used by institutions to instruct the broker to begin execution of a previously
 * submitted list.
 *
 * The format for the list execute message is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = L
 *  66      ListID              Y           Must be unique, by customer, for the day
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class ListExecuteMessage extends BaseApplicationMessage implements IListExecuteMessage {

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

        return this._msgType.formatted === MESSAGE_TYPES.list_execute;
    }
}
