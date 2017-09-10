import { CurrencyField } from '../../../dist/es6/src/messaging/fields/currency/currency';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { CURRENCY } from '../../messaging/fields/currency/currency';
import { IdSourceField } from '../../messaging/fields/id-source/id-source';
import { IoiIdField } from '../../messaging/fields/ioi-id/ioi-id';
import { IoiNumberOfSharesField } from '../../messaging/fields/ioi-number-of-shares/ioi-number-of-shares';
import { IoiOtherServicesField } from '../../messaging/fields/ioi-other-services/ioi-other-services';
import {
    IoiQualityOfIndicationField,
} from '../../messaging/fields/ioi-quality-of-inidication/ioi-quality-of-inidication';
import { IoiReferenceIdField } from '../../messaging/fields/ioi-reference-id/ioi-reference-id';
import {
    IoiTransactionTypeField, IOI_TRANSACTION_TYPE,
} from '../../messaging/fields/ioi-transaction-type/ioi-transaction-type';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { PriceField } from '../../messaging/fields/price/price';
import { SecurityIdField } from '../../messaging/fields/security-id/security-id';
import { SideField, SIDE } from '../../messaging/fields/side/side';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import { TextField } from '../../messaging/fields/text/text';
import { ValidUntilTimeField } from '../../messaging/fields/valid-until-time/valid-until-time';
import {
    IndicationOfInterestMessage, IIndicationOfInterestMessage, IProtoIndicationOfInterestMessage,
    ProtoIndicationOfInterestMessage,
} from '../../messaging/messages/indication-of-interest';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IIndicationOfInterestMessageBuilder extends IBaseMessageBuilder {
    message: IIndicationOfInterestMessage;
}

export class IndicationOfInterestMessageBuilder extends BaseMessageBuilder
    implements IIndicationOfInterestMessageBuilder {

    protected _message: IIndicationOfInterestMessage           = null;
    protected _protoMessage: IProtoIndicationOfInterestMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoIndicationOfInterestMessage();
    }

    public get message(): IIndicationOfInterestMessage { return this._message; }

    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.IOIid:
                this._protoMessage[Tag.IOIid] = new IoiIdField(rawValue);
                break;
            case Tag.IOITransType:
                this._protoMessage[Tag.IOITransType] = new IoiTransactionTypeField(rawValue);
                break;
            case Tag.IOIRefID:
                this._protoMessage[Tag.IOIRefID] = new IoiReferenceIdField(rawValue);
                break;
            case Tag.Symbol:
                this._protoMessage[Tag.Symbol] = new SymbolField(rawValue);
                break;
            case Tag.SymbolSfx:
                this._protoMessage[Tag.SymbolSfx] = new SymbolSuffixField(rawValue);
                break;
            case Tag.SecurityID:
                this._protoMessage[Tag.SecurityID] = new SecurityIdField(rawValue);
                break;
            case Tag.IDSource:
                this._protoMessage[Tag.IDSource] = new IdSourceField(rawValue);
                break;
            case Tag.Side:
                this._protoMessage[Tag.Side] = new SideField(rawValue);
                break;
            case Tag.IOIShares:
                this._protoMessage[Tag.IOIShares] = new IoiNumberOfSharesField(rawValue);
                break;
            case Tag.Price:
                this._protoMessage[Tag.Price] = new PriceField(rawValue);
                break;
            case Tag.Currency:
                this._protoMessage[Tag.Currency] = new CurrencyField(rawValue);
                break;
            case Tag.ValidUntilTime:
                this._protoMessage[Tag.ValidUntilTime] = new ValidUntilTimeField(rawValue);
                break;
            case Tag.IOIQltyInd:
                this._protoMessage[Tag.IOIQltyInd] = new IoiQualityOfIndicationField(rawValue);
                break;
            case Tag.IOIOthSvc:
                this._protoMessage[Tag.IOIOthSvc] = new IoiOtherServicesField(rawValue);
                break;
            case Tag.Text:
                this._protoMessage[Tag.Text] = new TextField(rawValue);
                break;
            default:
                rawDataLength = super.parseField(token);
                if (this._messageIsComplete) this.finalizeAndEmitMessage();
        }

        return rawDataLength;
    }

    public pushRawData(raw: string): boolean {

        let done: boolean = false;

        if (this._readingRawData) {
            this._rawBuffer += raw;
            if (this._rawBuffer.length === this._expectedRawLength) {

                //  Since we should be reading a raw data field, we can safely assume that #parseField will return
                // -1 (unless a disaster happened).
                this.parseField(this._rawBuffer);

                this._expectedRawLength = 0;
                this._readingRawData    = false;

                done = true;
            }
        } else {
            this._readingRawData = true;
        }

        return done;
    }

    /**
     * This method must be called in order to prepare the builder for a new stream of fields.  It does not reset
     * state members.  It only reinitializes the message and proto message.
     *
     * @param {IBeginningOfStringField} beginningOfStringField
     * @param {IBodyLengthField} bodyLengthField
     * @param {IMessageTypeField} messageTypeField
     */
    public reset(beginningOfStringField: IBeginningOfStringField,
                 bodyLengthField: IBodyLengthField,
                 messageTypeField: IMessageTypeField): void
    {
        super.reset(beginningOfStringField, bodyLengthField, messageTypeField);

        this._message      = null;
        this._protoMessage = new ProtoIndicationOfInterestMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.indication_of_interest;
        const message = new IndicationOfInterestMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  Indication messages can be transmitted in various transaction types; NEW, CANCEL, and REPLACE. All message types
     *  other than NEW modify the state of the message identified in IOIRefID.
     *
     *  The indication of interest message format is as follows:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = 6
     *      23      IOIid               Y
     *      28      IOITransType        Y
     *      26      IOIRefID            N           Required for Cancel and Replace IOITransType messages
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      54      Side                Y           Side of Indication
     *                                              Valid values:
     *                                                  1 = Buy
     *                                                  2 = Sell
     *      27      IOIShares           Y
     *      44      Price               N
     *      15      Currency            N           Indication without currency field is interpreted as US dollars.
     *      62      ValidUntilTime      N
     *      25      IOIQltyInd          N
     *      24      IOIOthSvc           N           Applicable only if advertised on public IOI service.
     *      58      Text                N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {
        super.validate();

        const ioiTransType: string = this._protoMessage[Tag.IOITransType].formatted;
        if ((ioiTransType === IOI_TRANSACTION_TYPE.cancel || ioiTransType === IOI_TRANSACTION_TYPE.replace)
            && !this._protoMessage[Tag.IOIRefID])
        {
            return false;
        }

        const side: string = this._protoMessage[Tag.Side].formatted;
        if (side !== SIDE.buy && side !== SIDE.sell) return false;

        if (!this._protoMessage[Tag.Currency]) {
            this._protoMessage[Tag.Currency] = new CurrencyField(CURRENCY.USD);
        }

        // TODO: Verify CheckSum

        return true;
    }
}
