import { IAdvertisementIdField } from '../fields/advertisement-id/advertisement-id';
import { IAdvertisementReferenceIdField } from '../fields/advertisement-reference-id/advertisement-reference-id';
import { IAdvertisementSideField } from '../fields/advertisement-side/advertisement-side';
import { IAdvertisementTransactionTypeField } from '../fields/advertisement-transaction-type/advertisement-transaction-type';
import { ICurrencyField } from '../fields/currency/currency';
import { IIdSourceField } from '../fields/id-source/id-source';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IPriceField } from '../fields/price/price';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISharesField } from '../fields/shares/shares';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { ITransactionTimeField } from '../fields/transaction-time/transaction-time';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

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

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get advId(): IAdvertisementIdField { return this._advId; }

    public set advId(field: IAdvertisementIdField) { this._advId = field; }

    public get advTransType(): IAdvertisementTransactionTypeField { return this._advTransType; }

    public set advTransType(field: IAdvertisementTransactionTypeField) { this._advTransType = field; }

    public get advRefId(): IAdvertisementReferenceIdField { return this._advRefId; }

    public set advRefId(field: IAdvertisementReferenceIdField) { this._advRefId = field; }

    public get symbol(): ISymbolField { return this._symbol; }

    public set symbol(field: ISymbolField) { this._symbol = field; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public set symbolSfx(field: ISymbolSuffixField) { this._symbolSfx = field; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public set securityId(field: ISecurityIdField) { this._securityId = field; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public set idSource(field: IIdSourceField) { this._idSource = field; }

    public get advSide(): IAdvertisementSideField { return this._advSide; }

    public set advSide(field: IAdvertisementSideField) { this._advSide = field; }

    public get shares(): ISharesField { return this._shares; }

    public set shares(field: ISharesField) { this._shares = field; }

    public get price(): IPriceField { return this._price; }

    public set price(field: IPriceField) { this._price = field; }

    public get currency(): ICurrencyField { return this._currency; }

    public set currency(field: ICurrencyField) { this._currency = field; }

    public get transactTime(): ITransactionTimeField { return this._transactTime; }

    public set transactTime(field: ITransactionTimeField) { this._transactTime = field; }

    public get text(): ITextField { return this._text; }

    public set text(field: ITextField) { this._text = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.advertisement;
    }
}
