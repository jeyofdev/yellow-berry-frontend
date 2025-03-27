export class AddOrRemoveProductToWishlistRequest {
	constructor(
		public productId: string,
		public wishlistId: string,
	) {}
}
