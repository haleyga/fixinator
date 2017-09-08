import { Tag } from '../fields/base/tag';
import { ILinesOfTextField } from '../fields/lines-of-text/lines-of-text';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOriginalTimeField } from '../fields/original-time/original-time';
import { IRawDataLengthField } from '../fields/raw-data-length/raw-data-length';
import { IRawDataField } from '../fields/raw-data/raw-data';
import { IRelatedSymbolField } from '../fields/related-symbol/related-symbol';
import { ITextField } from '../fields/text/text';
import { IUrgencyField } from '../fields/urgency/urgency';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoNewsMessage extends IProtoBaseApplicationMessage {
    42?: IOriginalTimeField;
    61?: IUrgencyField;
    46?: IRelatedSymbolField[];
    33: ILinesOfTextField;
    58: ITextField[];
    95?: IRawDataLengthField;
    96?: IRawDataField;
}

// tslint:enable:no-magic-numbers

export class ProtoNewsMessage extends ProtoBaseApplicationMessage implements IProtoNewsMessage {
    public 33: ILinesOfTextField = null;
    public 58: ITextField[]      = null;
}

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

    constructor(protoMessage: IProtoNewsMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get origTime(): IOriginalTimeField { return this._origTime; }

    public get urgency(): IUrgencyField { return this._urgency; }

    public get relatdSym(): IRelatedSymbolField[] { return this._relatdSym; }

    public get linesOfText(): ILinesOfTextField { return this._linesOfText; }

    public get text(): ITextField[] { return this._text; }

    public get rawDataLength(): IRawDataLengthField { return this._rawDataLength; }

    public get rawData(): IRawDataField { return this._rawData; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.news;
    }

    protected construct(protoMessage: IProtoNewsMessage): void {
        this._origTime      = protoMessage[Tag.OrigTime];
        this._urgency       = protoMessage[Tag.Urgency];
        this._relatdSym     = protoMessage[Tag.RelatdSym];
        this._linesOfText   = protoMessage[Tag.LinesOfText];
        this._text          = protoMessage[Tag.Text];
        this._rawDataLength = protoMessage[Tag.RawDataLength];
        this._rawData       = protoMessage[Tag.RawData];
    }
}
