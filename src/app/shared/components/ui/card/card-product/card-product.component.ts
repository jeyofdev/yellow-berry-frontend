import { CommonModule } from '@angular/common';
import { Component, InputSignal, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { ProductResponse } from '@models/product/product-response.model';
import { WishlistProductComponentService } from '@services/components/wishlist-product-component.service';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { PriceDiscountComponent } from '@shared/components/ui/price/price-with-discount/price.component';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { LayoutTypeInput } from '@type/list-product-input.type';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-card-product',
	imports: [CommonModule, RouterModule, ImageModule, PriceDiscountComponent, RatingComponent, ButtonIconSmallComponent],
	templateUrl: './card-product.component.html',
	styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
	private _wishlistProductComponentService: WishlistProductComponentService = inject(WishlistProductComponentService);

	public product: InputSignal<ProductResponse> = input.required<ProductResponse>();
	public layout: InputSignal<LayoutTypeInput> = input<LayoutTypeInput>('grid');
	public isShowCloseBtn: InputSignal<boolean> = input<boolean>(false);

	public routeEnum = RouteEnum;

	public onClick(): void {
		this._wishlistProductComponentService.addOrRemoveProductToWishlistAndUpdateSignal(this.product().id);
	}
}
