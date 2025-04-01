import { Cart } from '@models/cart/cart.model';
import { ProductResponse } from '@models/product/product-response.model';
import { Profile } from '@models/profile/profile.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';

export class CartDetailsResponse extends Cart {
	constructor(
		public override id: string,
		public override createdAt: Date,
		public override updatedAt: Date,
		public products: SuccessListResponse<ProductResponse>,
		public profile: Profile,
	) {
		super(id, createdAt, updatedAt);
	}
}
