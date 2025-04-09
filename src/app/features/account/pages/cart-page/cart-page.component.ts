import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListCartProductComponent } from '@shared/components/ui/list-cart-product/list-cart-product.component';
import { map } from 'rxjs';

@Component({
	selector: 'app-cart-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ListCartProductComponent],
	templateUrl: './cart-page.component.html',
	styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
	private _cartService: CartService = inject(CartService);

	public productList: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	constructor() {
		this._loadProductList();
	}

	private _loadProductList(): void {
		this._cartService
			.findByUserId()
			.pipe(
				map((cartDetailsResponse: SuccessResponse<CartDetailsResponse>) => {
					this.productList.set(cartDetailsResponse.result.products.results);
				}),
			)
			.subscribe();
	}
}
