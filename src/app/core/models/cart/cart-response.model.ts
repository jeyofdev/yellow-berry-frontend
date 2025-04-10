import { Cart } from '@models/cart/cart.model';

export class CartResponse extends Cart {
	constructor(
		public override id: string,
		public override createdAt: Date,
		public override updatedAt: Date,
		public override subTotalPrice: number,
		public override totalPrice: number,
	) {
		super(id, createdAt, updatedAt, subTotalPrice, totalPrice);
	}
}
