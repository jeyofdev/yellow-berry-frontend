import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { ProductResponse } from '@models/product/product-response.model';
import { ProductToCart } from './product-to-cart.model';

export class ProductToCartResponse extends ProductToCart {
	constructor(
		public override id: string,
		public override quantity: number,
		public override weight: string,
		public override name: string,
		public override priceDetails: PriceDetailsFormat,
		public product: ProductResponse,
	) {
		super(id, quantity, weight, name, priceDetails);
	}
}
