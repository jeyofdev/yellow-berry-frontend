import { CategoryResponse } from '@models/category/category-response.model';
import { Category } from '@models/category/category.model';
import { CommentResponse } from '@models/comment/comment-response.model';
import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';
import { ProductDetails } from '@models/product/product-details/product-details.model';
import { ProductInformations } from '@models/product/product-informations/product-informations.model';
import { Product } from '@models/product/product.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';

export class ProductDetailsResponse extends Product {
	constructor(
		public override id: string,
		public override name: string,
		public override ratingDetails: RatingDetailsFormat,
		public override priceDetails: PriceDetailsFormat,
		public override stock: string,
		public details: ProductDetails,
		public informations: ProductInformations,
		public reference: string,
		public description: string,
		public comments: SuccessListResponse<CommentResponse>,
		public categories: SuccessListResponse<Category>,
	) {
		super(id, name, ratingDetails, priceDetails, stock);
	}
}
