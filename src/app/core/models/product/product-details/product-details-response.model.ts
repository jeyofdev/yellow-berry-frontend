import { WeightEnum } from '@enum/weight.enum';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';
import { ProductDetails } from './product-details.model';

export class ProductResponse extends ProductDetails {
	constructor(
		public override id: string,
		public override description: string,
		public override seller: RatingDetailsFormat,
		public override service: WeightEnum,
	) {
		super(id, description, seller, service);
	}
}
