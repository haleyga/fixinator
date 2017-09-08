import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';
import { Tag } from '../fields/base/tag';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoListExecuteMessage extends IProtoBaseApplicationMessage {
    66: IListIdField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoListCancelRequestMessage extends ProtoBaseApplicationMessage
    implements IProtoListExecuteMessage
{
    public 66: IListIdField = null;
}

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

    constructor(protoMessage: IProtoListExecuteMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get listId(): IListIdField { return this._listId; }

    public get text(): ITextField { return this._text; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.list_execute;
    }

    protected construct(protoMessage: IProtoListExecuteMessage): void {
        this._listId = protoMessage[Tag.ListID];
        this._text   = protoMessage[Tag.Text];
    }
}
