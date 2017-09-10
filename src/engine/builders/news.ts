import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { LinesOfTextField } from '../../messaging/fields/lines-of-text/lines-of-text';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OriginalTimeField } from '../../messaging/fields/original-time/original-time';
import { RawDataLengthField } from '../../messaging/fields/raw-data-length/raw-data-length';
import { RawDataField } from '../../messaging/fields/raw-data/raw-data';
import { RelatedSymbolField } from '../../messaging/fields/related-symbol/related-symbol';
import { TextField } from '../../messaging/fields/text/text';
import { UrgencyField } from '../../messaging/fields/urgency/urgency';
import { INewsMessage, IProtoNewsMessage, NewsMessage, ProtoNewsMessage } from '../../messaging/messages/news';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface INewsMessageBuilder extends IBaseMessageBuilder {
    message: INewsMessage;
}

export class NewsMessageBuilder extends BaseMessageBuilder implements INewsMessageBuilder {

    protected _message: INewsMessage           = null;
    protected _protoMessage: IProtoNewsMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoNewsMessage();
    }

    public get message(): INewsMessage { return this._message; }

    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        let field                = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.OrigTime:
                this._protoMessage[Tag.OrigTime] = new OriginalTimeField(rawValue);
                break;
            case Tag.Urgency:
                this._protoMessage[Tag.Urgency] = new UrgencyField(rawValue);
                break;
            case Tag.RelatdSym:
                field = new RelatedSymbolField(rawValue);
                this._protoMessage[Tag.RelatdSym]
                    ? this._protoMessage[Tag.RelatdSym].push(field)
                    : this._protoMessage[Tag.RelatdSym] = [field];
                break;
            case Tag.LinesOfText:
                this._protoMessage[Tag.LinesOfText] = new LinesOfTextField(rawValue);
                break;
            case Tag.Text:
                field = new TextField(rawValue);
                this._protoMessage[Tag.Text]
                    ? this._protoMessage[Tag.Text].push(field)
                    : this._protoMessage[Tag.Text] = [field];
                break;
            case Tag.RawDataLength:
                this._protoMessage[Tag.RawDataLength] = new RawDataLengthField(rawValue);
                rawDataLength                         = this._protoMessage[Tag.RawDataLength].formatted;
                break;
            case Tag.RawData:
                this._protoMessage[Tag.RawData] = new RawDataField(rawValue);
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
        this._protoMessage = new ProtoNewsMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.news;
        const message = new NewsMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = B
     *      42      OrigTime            N
     *      61      Urgency             N
     *      46      * RelatdSym         N           Can be repeated multiple times if message is related to multiple
     *                                              symbols.
     *      33      LinesOfText         Y
     *      58      * Text              Y           Repeating field, number of instances defined in LinesOfText
     *      95      RawDataLength       N
     *      96      RawData             N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {
        super.validate();

        if (this._protoMessage[Tag.LinesOfText].formatted !== this._protoMessage[Tag.Text].length) return false;

        // TODO: Verify CheckSum

        return true;
    }
}
