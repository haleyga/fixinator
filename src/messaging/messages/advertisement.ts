import { IAdvertisementIdField } from '../fields/advertisement-id/advertisement-id';
import { IAdvertisementReferenceIdField } from '../fields/advertisement-reference-id/advertisement-reference-id';
import { IAdvertisementSideField } from '../fields/advertisement-side/advertisement-side';
import {
    IAdvertisementTransactionTypeField,
} from '../fields/advertisement-transaction-type/advertisement-transaction-type';
import { Tag } from '../fields/base/tag';
import { ICurrencyField } from '../fields/currency/currency';
import { IIdSourceField } from '../fields/id-source/id-source';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IPriceField } from '../fields/price/price';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISharesField } from '../fields/shares/shares';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { ITransactionTimeField } from '../fields/transaction-time/transaction-time';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoAdvertisementMessage extends IProtoBaseApplicationMessage {
    2: IAdvertisementIdField;
    5: IAdvertisementTransactionTypeField;
    3?: IAdvertisementReferenceIdField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    48?: ISecurityIdField;
    22?: IIdSourceField;
    4: IAdvertisementSideField;
    53: ISharesField;
    44?: IPriceField;
    15?: ICurrencyField;
    60?: ITransactionTimeField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoAdvertisementMessage extends ProtoBaseApplicationMessage implements IProtoAdvertisementMessage {
    public 2: IAdvertisementIdField              = null;
    public 5: IAdvertisementTransactionTypeField = null;
    public 55: ISymbolField                      = null;
    public 4: IAdvertisementSideField            = null;
    public 53: ISharesField                      = null;
}

export interface IAdvertisementMessage extends IBaseApplicationMessage {
    advId: IAdvertisementIdField;
    advTransType: IAdvertisementTransactionTypeField;
    advRefId?: IAdvertisementReferenceIdField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityId?: ISecurityIdField;
    idSource?: IIdSourceField;
    advSide: IAdvertisementSideField;
    shares: ISharesField;
    price?: IPriceField;
    currency?: ICurrencyField;
    transactTime?: ITransactionTimeField;
    text?: ITextField;
}

/**
 * Advertisement messages are used to announce completed transactions. The advertisement message can be transmitted
 * in various transaction types; NEW, CANCEL and REPLACE. All message types other than NEW modify the state of the
 * message AdvRefID.
 *
 * The advertisement record format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 7
 *  2       AdvID               Y
 *  5       AdvTransType        Y
 *  3       AdvRefID            N           Required for Cancel and Replace AdvTransType messages
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  4       AdvSide             Y
 *  53      Shares              Y
 *  44      Price               N
 *  15      Currency            N           Indication without currency field is interpreted as US dollars.
 *  60      TransactTime        N
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class AdvertisementMessage extends BaseApplicationMessage implements IAdvertisementMessage {

    protected _advId: IAdvertisementIdField                     = null;
    protected _advTransType: IAdvertisementTransactionTypeField = null;
    protected _advRefId: IAdvertisementReferenceIdField         = null;
    protected _symbol: ISymbolField                             = null;
    protected _symbolSfx: ISymbolSuffixField                    = null;
    protected _securityId: ISecurityIdField                     = null;
    protected _idSource: IIdSourceField                         = null;
    protected _advSide: IAdvertisementSideField                 = null;
    protected _shares: ISharesField                             = null;
    protected _price: IPriceField                               = null;
    protected _currency: ICurrencyField                         = null;
    protected _transactTime: ITransactionTimeField              = null;
    protected _text: ITextField                                 = null;

    constructor(protoMessage: IProtoAdvertisementMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get advId(): IAdvertisementIdField { return this._advId; }

    public get advTransType(): IAdvertisementTransactionTypeField { return this._advTransType; }

    public get advRefId(): IAdvertisementReferenceIdField { return this._advRefId; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public get advSide(): IAdvertisementSideField { return this._advSide; }

    public get shares(): ISharesField { return this._shares; }

    public get price(): IPriceField { return this._price; }

    public get currency(): ICurrencyField { return this._currency; }

    public get transactTime(): ITransactionTimeField { return this._transactTime; }

    public get text(): ITextField { return this._text; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.advertisement;
    }

    protected construct(protoMessage: IProtoAdvertisementMessage) {
        this._advId        = protoMessage[Tag.AdvId];
        this._advTransType = protoMessage[Tag.AdvTransType];
        this._advRefId     = protoMessage[Tag.AdvRefID];
        this._symbol       = protoMessage[Tag.Symbol];
        this._symbolSfx    = protoMessage[Tag.SymbolSfx];
        this._securityId   = protoMessage[Tag.SecurityID];
        this._idSource     = protoMessage[Tag.IDSource];
        this._advSide      = protoMessage[Tag.AdvSide];
        this._shares       = protoMessage[Tag.Shares];
        this._price        = protoMessage[Tag.Price];
        this._currency     = protoMessage[Tag.Currency];
        this._transactTime = protoMessage[Tag.TransactTime];
        this._text         = protoMessage[Tag.Text];
    }
}
