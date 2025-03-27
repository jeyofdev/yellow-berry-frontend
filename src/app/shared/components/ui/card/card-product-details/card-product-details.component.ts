import { CommonModule } from '@angular/common';
import { Component, InputSignal, Signal, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { ProductService } from '@services/product.service';
import { WishlistService } from '@services/wishlist.service';
import { ButtonComponent } from '@shared/components/ui/buttons/button/button.component';
import { NumberStepFieldComponent } from '@shared/components/ui/form/number-step-field/number-step-field.component';
import { PriceDiscountPercentageComponent } from '@shared/components/ui/price/price-discount-percentage/price-discount-percentage.component';
import { PriceComponent } from '@shared/components/ui/price/price/price.component';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

@Component({
	selector: 'app-card-product-details',
	imports: [
		CommonModule,
		FormsModule,
		ImageModule,
		RatingComponent,
		ButtonModule,
		ButtonComponent,
		NumberStepFieldComponent,
		PriceDiscountPercentageComponent,
		PriceComponent,
	],
	templateUrl: './card-product-details.component.html',
	styleUrl: './card-product-details.component.scss',
})
export class CardProductDetailsComponent {
	private _productService: ProductService = inject(ProductService);
	private _wishlistService: WishlistService = inject(WishlistService);

	public product: InputSignal<ProductDetailsResponse | null> = input.required<ProductDetailsResponse | null>();
	public wishlistId: Signal<string> = this.getWishlistId();

	productNb: number = 1;

	addOrRemoveToWishlist(): void {
		this._productService
			.addOrRemoveProductToWishlist({
				productId: this.product()?.id as string,
				wishlistId: this.wishlistId(),
			})
			.subscribe();
	}

	private getWishlistId(): Signal<string> {
		return toSignal(
			this._wishlistService
				.findByUserId()
				.pipe(map((wishlistResponse: SuccessResponse<WishlistDetailsResponse>) => wishlistResponse.result.id)),
			{ initialValue: '' },
		);
	}
}
