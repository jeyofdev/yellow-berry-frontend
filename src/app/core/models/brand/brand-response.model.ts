import { ColorEnum } from '@enum/color.enum';
import { Brand } from '@models/brand/brand.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessListResponse } from '@models/response/success-list-response.model';

export class BrandResponse extends Brand {
	constructor(
		public override id: string,
		public override name: string,
		public override color: ColorEnum,
		public products: SuccessListResponse<ProductResponse>,
	) {
		super(id, name, color);
	}
}
