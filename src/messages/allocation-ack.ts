import { IAllocationIdField } from '../fields/allocation-id/allocation-id';
import { IAllocationRejectionCodeField } from '../fields/allocation-rejection-code/allocation-rejection-code';
import { IAllocationStatusField } from '../fields/allocation-status/allocation-status';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { ITextField } from '../fields/text/text';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

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

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get allocId(): IAllocationIdField {
        return this._allocId;
    }

    public set allocId(value: IAllocationIdField) {
        this._allocId = value;
    }

    public get allocStatus(): IAllocationStatusField {
        return this._allocStatus;
    }

    public set allocStatus(value: IAllocationStatusField) {
        this._allocStatus = value;
    }

    public get allocRejCode(): IAllocationRejectionCodeField {
        return this._allocRejCode;
    }

    public set allocRejCode(value: IAllocationRejectionCodeField) {
        this._allocRejCode = value;
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

        return this._msgType.formatted === MESSAGE_TYPES.allocation_ack;
    }
}
