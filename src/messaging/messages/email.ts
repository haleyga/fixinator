import { Tag } from '../fields/base/tag';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { IEmailTypeField } from '../fields/email-type/email-type';
import { ILinesOfTextField } from '../fields/lines-of-text/lines-of-text';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { IOriginalTimeField } from '../fields/original-time/original-time';
import { IRawDataLengthField } from '../fields/raw-data-length/raw-data-length';
import { IRawDataField } from '../fields/raw-data/raw-data';
import { IRelatedSymbolField } from '../fields/related-symbol/related-symbol';
import { ITextField } from '../fields/text/text';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoEmailMessage extends IProtoBaseApplicationMessage {
    94: IEmailTypeField;
    42?: IOriginalTimeField;
    46?: IRelatedSymbolField[];
    37?: IOrderIdField;
    11?: IClientOrderIdField;
    33: ILinesOfTextField;
    58: ITextField[];
    95?: IRawDataLengthField;
    96?: IRawDataField;
}

//tslint:enable:no-magic-numbers

export class ProtoEmailMessage extends ProtoBaseApplicationMessage implements IProtoEmailMessage {
    public 94: IEmailTypeField   = null;
    public 33: ILinesOfTextField = null;
    public 58: ITextField[]      = null;
}

export interface IEmailMessage extends IBaseApplicationMessage {
    emailType: IEmailTypeField;
    origTime?: IOriginalTimeField;
    relatdSym?: IRelatedSymbolField[];
    orderId?: IOrderIdField;
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
 *  37      OrderID             N
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
    private _orderId: IOrderIdField             = null;
    private _clOrdId: IClientOrderIdField       = null;
    private _linesOfText: ILinesOfTextField     = null;
    private _text: ITextField[]                 = null;
    private _rawDataLength: IRawDataLengthField = null;
    private _rawData: IRawDataField             = null;

    constructor(protoMessage: IProtoEmailMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields
    public get emailType(): IEmailTypeField { return this._emailType; }

    public get origTime(): IOriginalTimeField { return this._origTime; }

    public get relatdSym(): IRelatedSymbolField[] { return this._relatdSym; }

    public get orderId(): IOrderIdField { return this._orderId; }

    public get clOrdId(): IClientOrderIdField { return this._clOrdId; }

    public get linesOfText(): ILinesOfTextField { return this._linesOfText; }

    public get text(): ITextField[] { return this._text; }

    public get rawDataLength(): IRawDataLengthField { return this._rawDataLength; }

    public get rawData(): IRawDataField { return this._rawData; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.email;
    }

    protected construct(protoMessage: IProtoEmailMessage): void {
        this._emailType     = protoMessage[Tag.EmailType];
        this._origTime      = protoMessage[Tag.OrigTime];
        this._relatdSym     = protoMessage[Tag.RelatdSym];
        this._orderId       = protoMessage[Tag.OrderID];
        this._clOrdId       = protoMessage[Tag.ClOrdID];
        this._linesOfText   = protoMessage[Tag.LinesOfText];
        this._text          = protoMessage[Tag.Text];
        this._rawDataLength = protoMessage[Tag.RawDataLength];
        this._rawData       = protoMessage[Tag.RawData];
    }

}
