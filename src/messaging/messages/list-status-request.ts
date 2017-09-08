import { Tag } from '../fields/base/tag';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import {
    BaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';
import { IBaseApplicationMessage } from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoListStatusRequestMessage extends IProtoBaseApplicationMessage {
    66: IListIdField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoListStatusRequestMessage extends ProtoBaseApplicationMessage
    implements IProtoListStatusRequestMessage
{
    public 66: IListIdField = null;
}

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

    constructor(protoMessage: IProtoListStatusRequestMessage) {
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

        return this._msgType.formatted === MESSAGE_TYPE.list_status_request;
    }

    protected construct(protoMessage: IProtoListStatusRequestMessage): void {
        this._listId = protoMessage[Tag.ListID];
        this._text   = protoMessage[Tag.Text];
    }
}
