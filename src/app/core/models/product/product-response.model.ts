import { Category } from '@models/category/category.model';
import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';
import { Product } from '@models/product/product.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';
import { TagResponse } from '@models/tag/tag-response.model copy';

export class ProductResponse extends Product {
	constructor(
		public override id: string,
		public override name: string,
		public override ratingDetails: RatingDetailsFormat,
		public override priceDetails: PriceDetailsFormat,
		public override stock: string,
		public description: string,
		public categories?: SuccessListResponse<Category>,
		public tags?: SuccessListResponse<TagResponse>,
	) {
		super(id, name, ratingDetails, priceDetails, stock);
	}
}
