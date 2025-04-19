import { Category } from '@models/category/category.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';

export class CategoryResponse extends Category {
	constructor(
		public override id: string,
		public override name: string,
		public products: SuccessListResponse<ProductResponse>,
	) {
		super(id, name);
	}
}
