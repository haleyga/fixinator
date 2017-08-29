import { ILinesOfTextField } from '../fields/lines-of-text/lines-of-text';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IOriginalTimeField } from '../fields/original-time/original-time';
import { IRawDataLengthField } from '../fields/raw-data-length/raw-data-length';
import { IRawDataField } from '../fields/raw-data/raw-data';
import { IRelatedSymbolField } from '../fields/related-symbol/related-symbol';
import { ITextField } from '../fields/text/text';
import { IUrgencyField } from '../fields/urgency/urgency';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface INewsMessage extends IBaseApplicationMessage {
    origTime?: IOriginalTimeField;
    urgency?: IUrgencyField;
    relatdSym?: IRelatedSymbolField[];
    linesOfText: ILinesOfTextField;
    text: ITextField[];
    rawDataLength?: IRawDataLengthField;
    rawData?: IRawDataField;
}

/**
 * The news message is intended for use as a general free format message between the broker and institution. The
 * message contains flags to identify the news item's urgency and to allow sorting by subject company (symbol). The
 * News record can be originated at either the broker or institution side.
 *
 * The news message format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = B
 *  42      OrigTime            N
 *  61      Urgency             N
 *  46      * RelatdSym         N           Can be repeated multiple times if message is related to multiple symbols.
 *  33      LinesOfText         Y
 *  58      * Text              Y           Repeating field, number of instances defined in LinesOfText
 *  95      RawDataLength       N
 *  96      RawData             N
 *          <Standard Trailer>  Y
 */
export class NewsMessage extends BaseApplicationMessage implements INewsMessage {

    private _origTime: IOriginalTimeField       = null;
    private _urgency: IUrgencyField             = null;
    private _relatdSym: IRelatedSymbolField[]   = null;
    private _linesOfText: ILinesOfTextField     = null;
    private _text: ITextField[]                 = null;
    private _rawDataLength: IRawDataLengthField = null;
    private _rawData: IRawDataField             = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get origTime(): IOriginalTimeField {
        return this._origTime;
    }

    public set origTime(value: IOriginalTimeField) {
        this._origTime = value;
    }

    public get urgency(): IUrgencyField {
        return this._urgency;
    }

    public set urgency(value: IUrgencyField) {
        this._urgency = value;
    }

    public get relatdSym(): IRelatedSymbolField[] {
        return this._relatdSym;
    }

    public set relatdSym(value: IRelatedSymbolField[]) {
        this._relatdSym = value;
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

        return this._msgType.formatted === MESSAGE_TYPES.news;
    }

}
