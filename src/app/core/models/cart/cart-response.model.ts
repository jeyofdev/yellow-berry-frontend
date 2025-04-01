import { Cart } from '@models/cart/cart.model';

export class CartResponse extends Cart {
	constructor(
		public override id: string,
		public override createdAt: Date,
		public override updatedAt: Date,
	) {
		super(id, createdAt, updatedAt);
	}
}
