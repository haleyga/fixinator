import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { IEmailTypeField } from '../fields/email-type/email-type';
import { ILinesOfTextField } from '../fields/lines-of-text/lines-of-text';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { IOriginalTimeField } from '../fields/original-time/original-time';
import { IRawDataLengthField } from '../fields/raw-data-length/raw-data-length';
import { IRawDataField } from '../fields/raw-data/raw-data';
import { IRelatedSymbolField } from '../fields/related-symbol/related-symbol';
import { ITextField } from '../fields/text/text';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface IEmailMessage extends IBaseApplicationMessage {
    emailType: IEmailTypeField;
    origTime?: IOriginalTimeField;
    relatdSym?: IRelatedSymbolField[];
    ordId?: IOrderIdField;
    clOrdId?: IClientOrderIdField;
    linesOfText: ILinesOfTextField;
    text: ITextField[];
    rawDataLength?: IRawDataLengthField;
    rawData?: IRawDataField;
}

/**
 * Format and purpose similar to News message, however, intended for private use between two parties.
 *
 * The email message format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = C
 *  94      EmailType           Y
 *  42      OrigTime            N
 *  46      * RelatdSym         N           Can be repeated multiple times if message is related to multiple symbols.
 *  37      OrdID               N
 *  11      ClOrdID             N
 *  33      LinesOfText         Y
 *  58      * Text              Y           Repeating field, number of instances defined in LinesOfText
 *  95      RawDataLength       N
 *  96      RawData             N
 *          <Standard Trailer>  Y
 */
export class EmailMessage extends BaseApplicationMessage implements IEmailMessage {

    private _emailType: IEmailTypeField         = null;
    private _origTime: IOriginalTimeField       = null;
    private _relatdSym: IRelatedSymbolField[]   = null;
    private _ordId: IOrderIdField               = null;
    private _clOrdId: IClientOrderIdField       = null;
    private _linesOfText: ILinesOfTextField     = null;
    private _text: ITextField[]                 = null;
    private _rawDataLength: IRawDataLengthField = null;
    private _rawData: IRawDataField             = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields
    public get emailType(): IEmailTypeField {
        return this._emailType;
    }

    public set emailType(value: IEmailTypeField) {
        this._emailType = value;
    }
    public get origTime(): IOriginalTimeField {
        return this._origTime;
    }

    public set origTime(value: IOriginalTimeField) {
        this._origTime = value;
    }
    public get relatdSym(): IRelatedSymbolField[] {
        return this._relatdSym;
    }

    public set relatdSym(value: IRelatedSymbolField[]) {
        this._relatdSym = value;
    }
    public get ordId(): IOrderIdField {
        return this._ordId;
    }

    public set ordId(value: IOrderIdField) {
        this._ordId = value;
    }
    public get clOrdId(): IClientOrderIdField {
        return this._clOrdId;
    }

    public set clOrdId(value: IClientOrderIdField) {
        this._clOrdId = value;
    }
    public get linesOfText(): ILinesOfTextField {
        return this._linesOfText;
    }

    public set linesOfText(value: ILinesOfTextField) {
        this._linesOfText = value;
    }
    public get text(): ITextField[] {
        return this._text;
    }

    public set text(value: ITextField[]) {
        this._text = value;
    }
    public get rawDataLength(): IRawDataLengthField {
        return this._rawDataLength;
    }

    public set rawDataLength(value: IRawDataLengthField) {
        this._rawDataLength = value;
    }
    public get rawData(): IRawDataField {
        return this._rawData;
    }

    public set rawData(value: IRawDataField) {
        this._rawData = value;
    }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.email;
    }

}
