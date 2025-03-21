import { ColorEnum } from '@enum/color.enum';
import { Brand } from '@models/brand/brand.model';

export class BrandResponse extends Brand {
	constructor(
		public override id: string,
		public override name: string,
		public override color: ColorEnum,
	) {
		super(id, name, color);
	}
}
