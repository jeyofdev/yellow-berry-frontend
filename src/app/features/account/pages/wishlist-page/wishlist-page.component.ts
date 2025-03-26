import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductResponse } from '@models/product/product-response.model';
import { Product } from '@models/product/product.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { WishlistService } from '@services/wishlist.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { map } from 'rxjs';

@Component({
	selector: 'app-wishlist-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ListProductComponent],
	templateUrl: './wishlist-page.component.html',
	styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent {
	private _wishlistService: WishlistService = inject(WishlistService);

	public productItemList: Signal<ProductResponse[]> = this.getProductItemList();

	private getProductItemList(): Signal<ProductResponse[]> {
		return toSignal(
			this._wishlistService.findById().pipe(
				map((wishlistResponse: SuccessResponse<WishlistDetailsResponse>) => {
					return wishlistResponse.result.products.results;
				}),
			),
			{ initialValue: [] },
		);
	}
}
