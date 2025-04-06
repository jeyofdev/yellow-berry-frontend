import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { ProductToCart } from './product-to-cart.model';

export class ProductToCartResponse extends ProductToCart {
	constructor(
		public override id: string,
		public override quantity: number,
		public override weight: string,
		public override name: string,
		public override priceDetails: PriceDetailsFormat,
	) {
		super(id, quantity, weight, name, priceDetails);
	}
}
