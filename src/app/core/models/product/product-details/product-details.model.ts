import { WeightEnum } from '@enum/weight.enum';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';

export class ProductDetails {
	constructor(
		public id: string,
		public description: string,
		public seller: RatingDetailsFormat,
		public service: WeightEnum,
	) {}
}
