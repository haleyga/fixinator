import { IAllocationIdField } from '../fields/allocation-id/allocation-id';
import { IAllocationRejectionCodeField } from '../fields/allocation-rejection-code/allocation-rejection-code';
import { IAllocationStatusField } from '../fields/allocation-status/allocation-status';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';
import { Tag } from '../fields/base/tag';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoAllocationAcknowledgementMessage extends IProtoBaseApplicationMessage {
    70: IAllocationIdField;
    87: IAllocationStatusField;
    88?: IAllocationRejectionCodeField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoAllocationAcknowledgementMessage extends ProtoBaseApplicationMessage
    implements IProtoAllocationAcknowledgementMessage
{
    public 70: IAllocationIdField     = null;
    public 87: IAllocationStatusField = null;
}

export interface IAllocationAcknowledgementMessage extends IBaseApplicationMessage {
    allocId: IAllocationIdField;
    allocStatus: IAllocationStatusField;
    allocRejCode?: IAllocationRejectionCodeField;
    text?: ITextField;
}

/**
 * The allocation ACK record is used by the broker to acknowledge the receipt and status of an allocation record
 * received from the institution.
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = P
 *  70      AllocID             Y
 *  87      AllocStatus         Y
 *  88      AllocRejCode        N           Required for AllocStatus = 1 (rejected)
 *  58      Text                N           Can include explanation for AllocRejCode = 7 (other)
 *          <Standard Trailer>  Y
 */
export class AllocationAcknowledgementMessage extends BaseApplicationMessage
    implements IAllocationAcknowledgementMessage {

    private _allocId: IAllocationIdField                 = null;
    private _allocStatus: IAllocationStatusField         = null;
    private _allocRejCode: IAllocationRejectionCodeField = null;
    private _text: ITextField                            = null;

    constructor(protoMessage: IProtoAllocationAcknowledgementMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get allocId(): IAllocationIdField { return this._allocId; }

    public get allocStatus(): IAllocationStatusField { return this._allocStatus; }

    public get allocRejCode(): IAllocationRejectionCodeField { return this._allocRejCode; }

    public get text(): ITextField { return this._text; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.allocation_ack;
    }

    protected construct(protoMessage: IProtoAllocationAcknowledgementMessage): void {
        this._allocId      = protoMessage[Tag.AllocID];
        this._allocStatus  = protoMessage[Tag.AllocStatus];
        this._allocRejCode = protoMessage[Tag.AllocRejCode];
        this._text         = protoMessage[Tag.Text];
    }
}
