import { ProductResponse } from '@models/product/product-response.model';
import { Product } from '@models/product/product.model';
import { Profile } from '@models/profile/profile.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';
import { Wishlist } from '@models/wishlist/wishlist.model';

export class WishlistDetailsResponse extends Wishlist {
	constructor(
		public override id: string,
		public override name: string,
		public products: SuccessListResponse<ProductResponse>,
		public profile: Profile,
	) {
		super(id, name);
	}
}
