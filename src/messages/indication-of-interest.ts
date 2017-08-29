import { ICurrencyField } from '../fields/currency/currency';
import { IIdSourceField } from '../fields/id-source/id-source';
import { IIoiIdField } from '../fields/ioi-id/ioi-id';
import { IIoiNumberOfSharesField } from '../fields/ioi-number-of-shares/ioi-number-of-shares';
import { IIoiOtherServicesField } from '../fields/ioi-other-services/ioi-other-services';
import { IIoiQualityOfIndicationField } from '../fields/ioi-quality-of-inidication/ioi-quality-of-inidication';
import { IIoiReferenceIdField } from '../fields/ioi-reference-id/ioi-reference-id';
import { IIoiTransactionTypeField } from '../fields/ioi-transaction-type/ioi-transaction-type';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IPriceField } from '../fields/price/price';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISideField } from '../fields/side/side';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { IValidUntilTimeField } from '../fields/valid-until-time/valid-until-time';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface IIndicationOfInterest extends IBaseApplicationMessage {
    ioiId: IIoiIdField;
    ioiTransType: IIoiTransactionTypeField;
    ioiRefId?: IIoiReferenceIdField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityId?: ISecurityIdField;
    idSource?: IIdSourceField;
    side: ISideField;
    ioiShares: IIoiNumberOfSharesField;
    price?: IPriceField;
    currency?: ICurrencyField;
    validUntilTime?: IValidUntilTimeField;
    ioiQltyInd?: IIoiQualityOfIndicationField;
    ioiOthSvc?: IIoiOtherServicesField;
    text?: ITextField;
}

/**
 * Indication of interest messages are used to market merchandise which the broker is buying or selling in either a
 * proprietary or agency capacity. The indications can be time bound with a specific expiration value. Indications
 * are distributed with the understanding that other firms may react to the message first and that the merchandise
 * may no longer be available due to prior trade.
 *
 * Indication messages can be transmitted in various transaction types; NEW, CANCEL, and REPLACE. All message types
 * other than NEW modify the state of the message identified in IOIRefID.
 *
 * The indication of interest message format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 6
 *  23      IOIid               Y
 *  28      IOITransType        Y
 *  26      IOIRefID            N           Required for Cancel and Replace IOITransType messages
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  54      Side                Y           Side of Indication
 *                                          Valid values:
 *                                              1 = Buy
 *                                              2 = Sell
 *  27      IOIShares           Y
 *  44      Price               N
 *  15      Currency            N           Indication without currency field is interpreted as US dollars.
 *  62      ValidUntilTime      N
 *  25      IOIQltyInd          N
 *  24      IOIOthSvc           N           Applicable only if advertised on public IOI service.
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class IndicationOfInterest extends BaseApplicationMessage implements IIndicationOfInterest {

    private _ioiId: IIoiIdField                       = null;
    private _ioiTransType: IIoiTransactionTypeField   = null;
    private _ioiRefId: IIoiReferenceIdField           = null;
    private _symbol: ISymbolField                     = null;
    private _symbolSfx: ISymbolSuffixField            = null;
    private _securityId: ISecurityIdField             = null;
    private _idSource: IIdSourceField                 = null;
    private _side: ISideField                         = null;
    private _ioiShares: IIoiNumberOfSharesField       = null;
    private _price: IPriceField                       = null;
    private _currency: ICurrencyField                 = null;
    private _validUntilTime: IValidUntilTimeField     = null;
    private _ioiQltyInd: IIoiQualityOfIndicationField = null;
    private _ioiOthSvc: IIoiOtherServicesField        = null;
    private _text: ITextField                         = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get text(): ITextField { return this._text; }

    public set text(value: ITextField) { this._text = value; }

    public get ioiOthSvc(): IIoiOtherServicesField { return this._ioiOthSvc; }

    public set ioiOthSvc(value: IIoiOtherServicesField) { this._ioiOthSvc = value; }

    public get ioiQltyInd(): IIoiQualityOfIndicationField { return this._ioiQltyInd; }

    public set ioiQltyInd(value: IIoiQualityOfIndicationField) { this._ioiQltyInd = value; }

    public get validUntilTime(): IValidUntilTimeField { return this._validUntilTime; }

    public set validUntilTime(value: IValidUntilTimeField) { this._validUntilTime = value; }

    public get currency(): ICurrencyField { return this._currency; }

    public set currency(value: ICurrencyField) { this._currency = value; }

    public get price(): IPriceField { return this._price; }

    public set price(value: IPriceField) { this._price = value; }

    public get ioiShares(): IIoiNumberOfSharesField { return this._ioiShares; }

    public set ioiShares(value: IIoiNumberOfSharesField) { this._ioiShares = value; }

    public get side(): ISideField { return this._side; }

    public set side(value: ISideField) { this._side = value; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public set idSource(value: IIdSourceField) { this._idSource = value; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public set securityId(value: ISecurityIdField) { this._securityId = value; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public set symbolSfx(value: ISymbolSuffixField) { this._symbolSfx = value; }

    public get symbol(): ISymbolField { return this._symbol; }

    public set symbol(value: ISymbolField) { this._symbol = value; }

    public get ioiRefId(): IIoiReferenceIdField { return this._ioiRefId; }

    public set ioiRefId(value: IIoiReferenceIdField) { this._ioiRefId = value; }

    public get ioiId(): IIoiIdField { return this._ioiId; }

    public set ioiId(value: IIoiIdField) { this._ioiId = value; }

    public get ioiTransType(): IIoiTransactionTypeField { return this._ioiTransType; }

    public set ioiTransType(value: IIoiTransactionTypeField) { this._ioiTransType = value; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.indication_of_interest;
    }

}

