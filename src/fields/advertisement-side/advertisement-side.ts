import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IAdvertisementSideField extends IConstrainedCharField {}
export const ADVERTISEMENT_SIDE_VALUES: string[] = ['B', 'S', 'T', 'X'];

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
export class AdvertisementSideField extends ConstrainedCharField implements IAdvertisementSideField {

    constructor(raw: string) {
        super(Tag.AdvSide, raw, ADVERTISEMENT_SIDE_VALUES);
    }

}
