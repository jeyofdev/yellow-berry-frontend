import { Cart } from '@models/cart/cart.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { Profile } from '@models/profile/profile.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';

export class CartDetailsResponse extends Cart {
	constructor(
		public override id: string,
		public override createdAt: Date,
		public override updatedAt: Date,
		public override subTotalPrice: number,
		public override totalPrice: number,
		public products: SuccessListResponse<ProductToCartResponse>,
		public profile: Profile,
	) {
		super(id, createdAt, updatedAt, subTotalPrice, totalPrice);
	}
}
