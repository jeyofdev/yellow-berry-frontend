export class ProductInformations {
	constructor(
		public id: string,
		public dimension: string,
		public colorList: string[],
		public weightList: string[],
		public quantity: number,
	) {}
}
