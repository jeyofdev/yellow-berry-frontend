import { WeightEnum } from '@enum/weight.enum';
import { PriceDetailsFormat } from '@models/format/price-details-format.model';

export class Product {
	constructor(
		public id: string,
		public name: string,
		public rating: number,
		public weight: WeightEnum,
		public priceDetails: PriceDetailsFormat,
	) {}
}
