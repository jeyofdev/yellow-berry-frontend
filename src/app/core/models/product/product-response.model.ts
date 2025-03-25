import { WeightEnum } from '@enum/weight.enum';
import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';
import { Product } from '@models/product/product.model';

export class ProductResponse extends Product {
	constructor(
		public override id: string,
		public override name: string,
		public override ratingDetails: RatingDetailsFormat,
		public override weight: WeightEnum,
		public override priceDetails: PriceDetailsFormat,
		public override stock: string,
		public description: string,
	) {
		super(id, name, ratingDetails, weight, priceDetails, stock);
	}
}
