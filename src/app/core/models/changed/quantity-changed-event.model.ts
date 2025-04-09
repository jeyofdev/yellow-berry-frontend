export class QuantityChangedEvent {
	constructor(
		public productId: string,
		public quantity: number,
	) {}
}
