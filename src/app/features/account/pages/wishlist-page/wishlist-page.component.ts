import { Component, OnDestroy, WritableSignal, effect, inject, signal } from '@angular/core';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { ProductComponentService } from '@services/components/product-component.service';
import { WishlistComponentService } from '@services/components/wishlist-component.service';
import { WishlistService } from '@services/wishlist.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { Subject, map } from 'rxjs';

@Component({
	selector: 'app-wishlist-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ListProductComponent],
	templateUrl: './wishlist-page.component.html',
	styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent implements OnDestroy {
	private _wishlistService: WishlistService = inject(WishlistService);
	private _productComponentService: ProductComponentService = inject(ProductComponentService);
	private _wishlistComponentService: WishlistComponentService = inject(WishlistComponentService);

	public wishlistId: WritableSignal<string> = signal<string>('');
	public productItemList: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	private _destroy$ = new Subject<void>();

	constructor() {
		this._loadWishlist();

		effect(() => {
			this.productItemList.set(this._productComponentService.getProductListInWishlist());
		});
	}

	private _loadWishlist(): void {
		this._wishlistService
			.findByUserId()
			.pipe(
				map((wishlistResponse: SuccessResponse<WishlistDetailsResponse>) => {
					this._wishlistComponentService.setWishlistId(wishlistResponse.result.id);
					this._productComponentService.setProductListInWishlist(wishlistResponse.result.products.results);
				}),
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
