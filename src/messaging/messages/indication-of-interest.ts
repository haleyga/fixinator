import { Tag } from '../fields/base/tag';
import { ICurrencyField } from '../fields/currency/currency';
import { IIdSourceField } from '../fields/id-source/id-source';
import { IIoiIdField } from '../fields/ioi-id/ioi-id';
import { IIoiNumberOfSharesField } from '../fields/ioi-number-of-shares/ioi-number-of-shares';
import { IIoiOtherServicesField } from '../fields/ioi-other-services/ioi-other-services';
import { IIoiQualityOfIndicationField } from '../fields/ioi-quality-of-inidication/ioi-quality-of-inidication';
import { IIoiReferenceIdField } from '../fields/ioi-reference-id/ioi-reference-id';
import { IIoiTransactionTypeField } from '../fields/ioi-transaction-type/ioi-transaction-type';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IPriceField } from '../fields/price/price';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISideField } from '../fields/side/side';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { IValidUntilTimeField } from '../fields/valid-until-time/valid-until-time';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoIndicationOfInterestMessage extends IProtoBaseApplicationMessage {
    23: IIoiIdField;
    28: IIoiTransactionTypeField;
    26?: IIoiReferenceIdField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    48?: ISecurityIdField;
    22?: IIdSourceField;
    54: ISideField;
    27: IIoiNumberOfSharesField;
    44?: IPriceField;
    15?: ICurrencyField;
    62?: IValidUntilTimeField;
    25?: IIoiQualityOfIndicationField;
    24?: IIoiOtherServicesField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoIndicationOfInterestMessage extends ProtoBaseApplicationMessage
    implements IProtoIndicationOfInterestMessage
{
    public 23: IIoiIdField              = null;
    public 28: IIoiTransactionTypeField = null;
    public 55: ISymbolField             = null;
    public 54: ISideField               = null;
    public 27: IIoiNumberOfSharesField  = null;
}

export interface IIndicationOfInterestMessage extends IBaseApplicationMessage {
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

export class IndicationOfInterestMessage extends BaseApplicationMessage implements IIndicationOfInterestMessage {

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

    constructor(protoMessage: IProtoIndicationOfInterestMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get text(): ITextField { return this._text; }

    public get ioiOthSvc(): IIoiOtherServicesField { return this._ioiOthSvc; }

    public get ioiQltyInd(): IIoiQualityOfIndicationField { return this._ioiQltyInd; }

    public get validUntilTime(): IValidUntilTimeField { return this._validUntilTime; }

    public get currency(): ICurrencyField { return this._currency; }

    public get price(): IPriceField { return this._price; }

    public get ioiShares(): IIoiNumberOfSharesField { return this._ioiShares; }

    public get side(): ISideField { return this._side; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get ioiRefId(): IIoiReferenceIdField { return this._ioiRefId; }

    public get ioiId(): IIoiIdField { return this._ioiId; }

    public get ioiTransType(): IIoiTransactionTypeField { return this._ioiTransType; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.indication_of_interest;
    }

    protected construct(protoMessage: IProtoIndicationOfInterestMessage): void {
        this._ioiId          = protoMessage[Tag.IOIid];
        this._ioiTransType   = protoMessage[Tag.IOITransType];
        this._ioiRefId       = protoMessage[Tag.IOIRefID];
        this._symbol         = protoMessage[Tag.Symbol];
        this._symbolSfx      = protoMessage[Tag.SymbolSfx];
        this._securityId     = protoMessage[Tag.SecurityID];
        this._idSource       = protoMessage[Tag.IDSource];
        this._side           = protoMessage[Tag.Side];
        this._ioiShares      = protoMessage[Tag.IOIShares];
        this._price          = protoMessage[Tag.Price];
        this._currency       = protoMessage[Tag.Currency];
        this._validUntilTime = protoMessage[Tag.ValidUntilTime];
        this._ioiQltyInd     = protoMessage[Tag.IOIQltyInd];
        this._ioiOthSvc      = protoMessage[Tag.IOIOthSvc];
        this._text           = protoMessage[Tag.Text];
    }

}

