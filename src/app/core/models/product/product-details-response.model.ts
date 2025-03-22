import { WeightEnum } from '@enum/weight.enum';
import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { Product } from '@models/product/product.model';

export class ProductDetailsResponse extends Product {
	constructor(
		public override id: string,
		public override name: string,
		public override rating: number,
		public override weight: WeightEnum,
		public override priceDetails: PriceDetailsFormat,
	) {
		super(id, name, rating, weight, priceDetails);
	}
}
