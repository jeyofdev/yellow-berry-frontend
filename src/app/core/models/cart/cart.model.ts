export class Cart {
	constructor(
		public id: string,
		public createdAt: Date,
		public updatedAt: Date,
		public subTotalPrice: number,
		public totalPrice: number,
	) {}
}
