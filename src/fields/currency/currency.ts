import { ConstrainedCharField, IConstrainedCharField, } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ICurrencyField extends IConstrainedCharField {}
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
]

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
