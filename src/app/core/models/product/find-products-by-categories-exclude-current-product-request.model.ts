export class FindProductsByCategoryExcludeCurrentProductRequest {
	constructor(
		public productId: string,
		public categoryId: string,
	) {}
}
