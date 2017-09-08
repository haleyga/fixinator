import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IReferenceSequenceNumberField } from '../fields/reference-sequence-number/reference-sequence-number';
import { ITextField } from '../fields/text/text';
import {
    BaseAdministrativeMessage, IBaseAdministrativeMessage, IProtoBaseAdministrativeMessage,
    ProtoBaseAdministrativeMessage,
} from './base-administrative-message';
import { Tag } from '../fields/base/tag';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoRejectMessage extends IProtoBaseAdministrativeMessage {
    45?: IReferenceSequenceNumberField;
    58?: ITextField;
}

// tslint:enable:no-magic-numbers

export class ProtoRejectMessage extends ProtoBaseAdministrativeMessage implements IProtoRejectMessage {}

export interface IRejectMessage extends IBaseAdministrativeMessage {
    refSeqNo?: IReferenceSequenceNumberField;
    text?: ITextField;
}

/**
 * The reject message will be issued when a message is received which cannot be parsed or contains invalid
 * information (i.e. fails one of the validation tests). Where possible the cause of the failure will be described
 * in the Text field.
 *
 * The reject format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 3
 *  45      RefSeqNo            N           May not be available if message is unparsable
 *  58      Text                N           Where possible, message to explain reason for rejection
 *          <Standard Trailer>  Y
 */
export abstract class RejectMessage extends BaseAdministrativeMessage implements IRejectMessage {

    protected _refSeqNo: IReferenceSequenceNumberField = null;
    protected _text: ITextField                        = null;

    constructor(protoMessage: IProtoRejectMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get refSeqNo(): IReferenceSequenceNumberField { return this._refSeqNo; }

    public set refSeqNo(field: IReferenceSequenceNumberField) { this._refSeqNo = field; }

    public get text(): ITextField { return this._text; }

    public set text(field: ITextField) { this._text = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.reject;
    }

    protected construct(protoMessage: IProtoRejectMessage): void {
        this._refSeqNo = protoMessage[Tag.RefSeqNum];
        this._text     = protoMessage[Tag.Text];
    }
}
