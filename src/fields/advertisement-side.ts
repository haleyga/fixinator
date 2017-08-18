import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IAdvertisementSideField extends IStringEnumField {}

/**
 * Field ID (TAG): 4
 * Field Name: AdvSide
 * Format: char
 * Description: Broker's side of advertised trade
 *                    Valid values:
 *                      B = Buy
 *                      S = Sell
 *                      X = Cross
 *                      T = Trade
 */
export class AdvertisementSideField extends StringEnumField implements IAdvertisementSideField {

    constructor(raw: string) {
        super(Tag.AdvSide, raw, {
            B: ['B', 'buy'],
            S: ['S', 'sell'],
            T: ['T', 'trade'],
            X: ['X', 'cross'],
        });
    }

}
