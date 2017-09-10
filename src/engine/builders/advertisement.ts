import { AdvertisementIdField } from '../../messaging/fields/advertisement-id/advertisement-id';
import {
    AdvertisementReferenceIdField,
} from '../../messaging/fields/advertisement-reference-id/advertisement-reference-id';
import { AdvertisementSideField } from '../../messaging/fields/advertisement-side/advertisement-side';
import {
    AdvertisementTransactionTypeField,
    ADVERTISEMENT_TRANSACTION_TYPE,
} from '../../messaging/fields/advertisement-transaction-type/advertisement-transaction-type';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { CurrencyField, CURRENCY } from '../../messaging/fields/currency/currency';
import { IdSourceField } from '../../messaging/fields/id-source/id-source';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { PriceField } from '../../messaging/fields/price/price';
import { SecurityIdField } from '../../messaging/fields/security-id/security-id';
import { SharesField } from '../../messaging/fields/shares/shares';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import { TextField } from '../../messaging/fields/text/text';
import { TransactionTimeField } from '../../messaging/fields/transaction-time/transaction-time';
import {
    AdvertisementMessage, IAdvertisementMessage, IProtoAdvertisementMessage, ProtoAdvertisementMessage,
} from '../../messaging/messages/advertisement';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IAdvertisementMessageBuilder extends IBaseMessageBuilder {
    message: IAdvertisementMessage;
}

export class AdvertisementMessageBuilder extends BaseMessageBuilder implements IAdvertisementMessageBuilder {

    protected _message: IAdvertisementMessage           = null;
    protected _protoMessage: IProtoAdvertisementMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoAdvertisementMessage();
    }

    public get message(): IAdvertisementMessage { return this._message; }

    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.AdvId:
                this._protoMessage[Tag.AdvId] = new AdvertisementIdField(rawValue);
                break;
            case Tag.AdvTransType:
                this._protoMessage[Tag.AdvTransType] = new AdvertisementTransactionTypeField(rawValue);
                break;
            case Tag.AdvRefID:
                this._protoMessage[Tag.AdvRefID] = new AdvertisementReferenceIdField(rawValue);
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
            case Tag.AdvSide:
                this._protoMessage[Tag.AdvSide] = new AdvertisementSideField(rawValue);
                break;
            case Tag.Shares:
                this._protoMessage[Tag.Shares] = new SharesField(rawValue);
                break;
            case Tag.Price:
                this._protoMessage[Tag.Price] = new PriceField(rawValue);
                break;
            case Tag.Currency:
                this._protoMessage[Tag.Currency] = new CurrencyField(rawValue);
                break;
            case Tag.TransactTime:
                this._protoMessage[Tag.TransactTime] = new TransactionTimeField(rawValue);
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

    /**
     * Since this implementation calls the local #parseField method, it cannot reuse shared base code.  This is
     * mentioned because all builders will essentially duplicate this method.
     *
     * @param {string} raw
     * @returns {boolean}
     */
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
     * This method must be called in order to prepare the builder for a new stream of fields.
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
        this._protoMessage = new ProtoAdvertisementMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const message = new AdvertisementMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, message);
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *      Advertisement messages are used to announce completed transactions. The advertisement message can be
     *      transmitted in various transaction types; NEW, CANCEL and REPLACE. All message types other than NEW
     *      modify the state of the message AdvRefID.
     *
     *      The advertisement record format is as follows:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = 7
     *      2       AdvID               Y
     *      5       AdvTransType        Y
     *      3       AdvRefID            N           Required for Cancel and Replace AdvTransType messages
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      4       AdvSide             Y
     *      53      Shares              Y
     *      44      Price               N
     *      15      Currency            N           Indication without currency field is interpreted as US dollars.
     *      60      TransactTime        N
     *      58      Text                N
     *              <Standard Trailer>  Y
     *
     * @see AdvertisementMessage
     * @returns {boolean}
     */
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.advertisement) return false;

        // Check AdvID
        if (!this._protoMessage[Tag.AdvId]) return false;

        // Check AdvTransType
        if (!this._protoMessage[Tag.AdvTransType]) return false;

        // Check AdvRefID
        if ((this._protoMessage[Tag.AdvTransType].formatted === ADVERTISEMENT_TRANSACTION_TYPE.cancel
             || this._protoMessage[Tag.AdvTransType].formatted === ADVERTISEMENT_TRANSACTION_TYPE.replace)
            && !this._protoMessage[Tag.AdvRefID])
        {
            return false;
        }

        // Check Symbol
        if (!this._protoMessage[Tag.Symbol]) return false;

        // Check AdvSide
        if (!this._protoMessage[Tag.AdvSide]) return false;

        // Check Shares
        if (!this._protoMessage[Tag.Shares]) return false;

        // Set Currency to default if not present.
        if (!this._protoMessage[Tag.Currency]) this._protoMessage[Tag.Currency] = new CurrencyField(CURRENCY.USD);

        // Validate Trailer
        return this.validateTrailer();
    }
}
