import { WeightEnum } from '@enum/weight.enum';
import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';

export class Product {
	constructor(
		public id: string,
		public name: string,
		public ratingDetails: RatingDetailsFormat,
		public weight: WeightEnum,
		public priceDetails: PriceDetailsFormat,
		public stock: string,
	) {}
}
