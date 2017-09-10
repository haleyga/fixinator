import { ConstrainedKeyToStringMap } from '../../../util/util';
import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ICurrencyField extends IConstrainedCharField {}

/**
 * Field ID (TAG): 15
 * Field Name: Currency
 * Format: char
 * Description: Identifies currency used for price. Absence of this field in a message is interpreted as US dollars.
 *              See Appendix A for valid values.
 */
export class CurrencyField extends ConstrainedCharField implements ICurrencyField {

    constructor(raw: string) {
        super(Tag.Currency, raw, CURRENCY_VALUES);
    }

}

export const CURRENCY_VALUES: string[] = [
    'AED', 'AFA', 'ALL', 'ANG', 'AOK', 'ARA', 'ATS', 'AUD', 'BBD', 'BDT', 'BEC', 'BEF', 'BEL', 'BGL', 'BHD',
    'BIF', 'BMD', 'BND', 'BOP', 'BRN', 'BSD', 'BUK', 'BWP', 'BZD', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CRC',
    'CSK', 'CUP', 'CVE', 'CYP', 'DEM', 'DJF', 'DKK', 'DOP', 'DZD', 'ECC', 'ECS', 'ECU', 'EGP', 'ESA', 'ESB',
    'ESP', 'ETB', 'EUA', 'FIM', 'FJD', 'FKP', 'FRF', 'GBP', 'GHC', 'GIP', 'GMD', 'GNS', 'GQE', 'GRD', 'GTQ',
    'GWB', 'GWP', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR', 'IEP', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'ITL',
    'JMD', 'JOD', 'JPY', 'KES', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'LAK', 'LBP', 'LKR', 'LRD', 'LSM',
    'LUF', 'LYD', 'MAD', 'MGF', 'MLF', 'MNT', 'MOP', 'MRO', 'MTP', 'MUR', 'MVR', 'MWK', 'MXP', 'MYR', 'MZM',
    'NGN', 'NIC', 'NLG', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PES', 'PGK', 'PHP', 'PKR', 'PLZ', 'PTE', 'PYG',
    'QAR', 'ROL', 'RWF', 'SAR', 'SBD', 'SCR', 'SDP', 'SDR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRG', 'STD',
    'SUR', 'SVC', 'SYP', 'SZL', 'THB', 'TND', 'TOP', 'TPE', 'TRL', 'TTD', 'TWD', 'TZS', 'UGS', 'USD', 'UYP',
    'VEB', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YDD', 'YER', 'YUD', 'ZAR', 'ZMK', 'ZRZ', 'ZWD',
];

export type Currency =
    'AED'
    | 'AFA'
    | 'ALL'
    | 'ANG'
    | 'AOK'
    | 'ARA'
    | 'ATS'
    | 'AUD'
    | 'BBD'
    | 'BDT'
    | 'BEC'
    | 'BEF'
    | 'BEL'
    | 'BGL'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOP'
    | 'BRN'
    | 'BSD'
    | 'BUK'
    | 'BWP'
    | 'BZD'
    | 'CAD'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CSK'
    | 'CUP'
    | 'CVE'
    | 'CYP'
    | 'DEM'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'ECC'
    | 'ECS'
    | 'ECU'
    | 'EGP'
    | 'ESA'
    | 'ESB'
    | 'ESP'
    | 'ETB'
    | 'EUA'
    | 'FIM'
    | 'FJD'
    | 'FKP'
    | 'FRF'
    | 'GBP'
    | 'GHC'
    | 'GIP'
    | 'GMD'
    | 'GNS'
    | 'GQE'
    | 'GRD'
    | 'GTQ'
    | 'GWB'
    | 'GWP'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'IEP'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'ITL'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSM'
    | 'LUF'
    | 'LYD'
    | 'MAD'
    | 'MGF'
    | 'MLF'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MTP'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXP'
    | 'MYR'
    | 'MZM'
    | 'NGN'
    | 'NIC'
    | 'NLG'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PES'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLZ'
    | 'PTE'
    | 'PYG'
    | 'QAR'
    | 'ROL'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDP'
    | 'SDR'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLL'
    | 'SOS'
    | 'SRG'
    | 'STD'
    | 'SUR'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TND'
    | 'TOP'
    | 'TPE'
    | 'TRL'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UGS'
    | 'USD'
    | 'UYP'
    | 'VEB'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YDD'
    | 'YER'
    | 'YUD'
    | 'ZAR'
    | 'ZMK'
    | 'ZRZ'
    | 'ZWD';

export const CURRENCY: ConstrainedKeyToStringMap<Currency> = {
    AED: 'AED',
    AFA: 'AFA',
    ALL: 'ALL',
    ANG: 'ANG',
    AOK: 'AOK',
    ARA: 'ARA',
    ATS: 'ATS',
    AUD: 'AUD',
    BBD: 'BBD',
    BDT: 'BDT',
    BEC: 'BEC',
    BEF: 'BEF',
    BEL: 'BEL',
    BGL: 'BGL',
    BHD: 'BHD',
    BIF: 'BIF',
    BMD: 'BMD',
    BND: 'BND',
    BOP: 'BOP',
    BRN: 'BRN',
    BSD: 'BSD',
    BUK: 'BUK',
    BWP: 'BWP',
    BZD: 'BZD',
    CAD: 'CAD',
    CHF: 'CHF',
    CLP: 'CLP',
    CNY: 'CNY',
    COP: 'COP',
    CRC: 'CRC',
    CSK: 'CSK',
    CUP: 'CUP',
    CVE: 'CVE',
    CYP: 'CYP',
    DEM: 'DEM',
    DJF: 'DJF',
    DKK: 'DKK',
    DOP: 'DOP',
    DZD: 'DZD',
    ECC: 'ECC',
    ECS: 'ECS',
    ECU: 'ECU',
    EGP: 'EGP',
    ESA: 'ESA',
    ESB: 'ESB',
    ESP: 'ESP',
    ETB: 'ETB',
    EUA: 'EUA',
    FIM: 'FIM',
    FJD: 'FJD',
    FKP: 'FKP',
    FRF: 'FRF',
    GBP: 'GBP',
    GHC: 'GHC',
    GIP: 'GIP',
    GMD: 'GMD',
    GNS: 'GNS',
    GQE: 'GQE',
    GRD: 'GRD',
    GTQ: 'GTQ',
    GWB: 'GWB',
    GWP: 'GWP',
    GYD: 'GYD',
    HKD: 'HKD',
    HNL: 'HNL',
    HTG: 'HTG',
    HUF: 'HUF',
    IDR: 'IDR',
    IEP: 'IEP',
    ILS: 'ILS',
    INR: 'INR',
    IQD: 'IQD',
    IRR: 'IRR',
    ISK: 'ISK',
    ITL: 'ITL',
    JMD: 'JMD',
    JOD: 'JOD',
    JPY: 'JPY',
    KES: 'KES',
    KHR: 'KHR',
    KMF: 'KMF',
    KPW: 'KPW',
    KRW: 'KRW',
    KWD: 'KWD',
    KYD: 'KYD',
    LAK: 'LAK',
    LBP: 'LBP',
    LKR: 'LKR',
    LRD: 'LRD',
    LSM: 'LSM',
    LUF: 'LUF',
    LYD: 'LYD',
    MAD: 'MAD',
    MGF: 'MGF',
    MLF: 'MLF',
    MNT: 'MNT',
    MOP: 'MOP',
    MRO: 'MRO',
    MTP: 'MTP',
    MUR: 'MUR',
    MVR: 'MVR',
    MWK: 'MWK',
    MXP: 'MXP',
    MYR: 'MYR',
    MZM: 'MZM',
    NGN: 'NGN',
    NIC: 'NIC',
    NLG: 'NLG',
    NOK: 'NOK',
    NPR: 'NPR',
    NZD: 'NZD',
    OMR: 'OMR',
    PAB: 'PAB',
    PES: 'PES',
    PGK: 'PGK',
    PHP: 'PHP',
    PKR: 'PKR',
    PLZ: 'PLZ',
    PTE: 'PTE',
    PYG: 'PYG',
    QAR: 'QAR',
    ROL: 'ROL',
    RWF: 'RWF',
    SAR: 'SAR',
    SBD: 'SBD',
    SCR: 'SCR',
    SDP: 'SDP',
    SDR: 'SDR',
    SEK: 'SEK',
    SGD: 'SGD',
    SHP: 'SHP',
    SLL: 'SLL',
    SOS: 'SOS',
    SRG: 'SRG',
    STD: 'STD',
    SUR: 'SUR',
    SVC: 'SVC',
    SYP: 'SYP',
    SZL: 'SZL',
    THB: 'THB',
    TND: 'TND',
    TOP: 'TOP',
    TPE: 'TPE',
    TRL: 'TRL',
    TTD: 'TTD',
    TWD: 'TWD',
    TZS: 'TZS',
    UGS: 'UGS',
    USD: 'USD',
    UYP: 'UYP',
    VEB: 'VEB',
    VND: 'VND',
    VUV: 'VUV',
    WST: 'WST',
    XAF: 'XAF',
    XCD: 'XCD',
    XOF: 'XOF',
    XPF: 'XPF',
    YDD: 'YDD',
    YER: 'YER',
    YUD: 'YUD',
    ZAR: 'ZAR',
    ZMK: 'ZMK',
    ZRZ: 'ZRZ',
    ZWD: 'ZWD',
};
