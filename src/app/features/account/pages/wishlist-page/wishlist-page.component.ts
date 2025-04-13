import { Component, WritableSignal, effect, inject, signal } from '@angular/core';
import { ProductResponse } from '@models/product/product-response.model';
import { WishlistProductComponentService } from '@services/components/wishlist-product-component.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';

@Component({
	selector: 'app-wishlist-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ListProductComponent],
	templateUrl: './wishlist-page.component.html',
	styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent {
	private _wishlistProductComponentService: WishlistProductComponentService = inject(WishlistProductComponentService);

	public productItemList: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	constructor() {
		effect(() => {
			this.productItemList.set(this._wishlistProductComponentService.getProductListInWishlist());
		});
	}
}
