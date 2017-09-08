import { Tag } from '../fields/base/tag';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoListCancelRequestMessage extends IProtoBaseApplicationMessage {
    66: IListIdField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoListCancelRequestMessage extends ProtoBaseApplicationMessage
    implements IProtoListCancelRequestMessage
{
    public 66: IListIdField = null;
}

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
export class ListCancelRequestMessage extends BaseApplicationMessage implements IListCancelRequestMessage {

    private _listId: IListIdField = null;
    private _text: ITextField     = null;

    constructor(protoMessage: IProtoListCancelRequestMessage) {
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

        return this._msgType.formatted === MESSAGE_TYPE.list_cancel_request;
    }

    protected construct(protoMessage: IProtoListCancelRequestMessage): void {
        this._listId = protoMessage[Tag.ListID];
        this._text   = protoMessage[Tag.Text];
    }

}
