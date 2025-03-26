import { ProductInformations } from './product-informations.model';

export class ProductInformationsResponse extends ProductInformations {
	constructor(
		public override id: string,
		public override dimension: string,
		public override colorList: string[],
		public override weightList: string[],
		public override quantity: number,
	) {
		super(id, dimension, colorList, weightList, quantity);
	}
}
