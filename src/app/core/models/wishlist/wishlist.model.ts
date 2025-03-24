import { Product } from '@models/product/product.model';
import { Profile } from '@models/profile/profile.model';
import { SuccessResponse } from '@models/response/success-response.model';

export class Wishlist {
	constructor(
		public id: string,
		public name: string,
	) {}
}
