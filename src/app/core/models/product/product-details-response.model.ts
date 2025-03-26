import { PriceDetailsFormat } from '@models/format/price-details-format.model';
import { RatingDetailsFormat } from '@models/format/rating-details-format.model';
import { ProductDetails } from '@models/product/product-details/product-details.model';
import { ProductInformations } from '@models/product/product-informations/product-informations.model';
import { Product } from '@models/product/product.model';

export class ProductDetailsResponse extends Product {
	constructor(
		public override id: string,
		public override name: string,
		public override ratingDetails: RatingDetailsFormat,
		public override priceDetails: PriceDetailsFormat,
		public override stock: string,
		public details: ProductDetails,
		public informations: ProductInformations,
		public reference: string,
	) {
		super(id, name, ratingDetails, priceDetails, stock);
	}
}
