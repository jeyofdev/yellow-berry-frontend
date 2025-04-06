import { PriceDetailsFormat } from '@models/format/price-details-format.model';

export class ProductToCart {
	constructor(
		public id: string,
		public quantity: number,
		public weight: string,
		public name: string,
		public priceDetails: PriceDetailsFormat,
	) {}
}
