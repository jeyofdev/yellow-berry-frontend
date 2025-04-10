import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { CartResponse } from '@models/cart/cart-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CartTotalComponent } from '@shared/components/ui/cart/cart-total/cart-total.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListCartProductComponent } from '@shared/components/ui/list/list-cart-product/list-cart-product.component';
import { ButtonModule } from 'primeng/button';
import { map, switchMap } from 'rxjs';

@Component({
	selector: 'app-cart-page',
	imports: [
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		ListCartProductComponent,
		ButtonModule,
		CartTotalComponent,
	],
	templateUrl: './cart-page.component.html',
	styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
	private _cartService: CartService = inject(CartService);

	public cart: WritableSignal<CartDetailsResponse | null> = signal<CartDetailsResponse | null>(null);
	public productList: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	constructor() {
		this._updateCartAndLoadProductListCart();
	}

	onProductListChange() {
		this._updateCartAndLoadProductListCart();
	}

	private _updateCartAndLoadProductListCart(): void {
		this._cartService
			.findByUserId()
			.pipe(
				switchMap(response =>
					this._cartService.update(response.result.id).pipe(
						map((cartResponse: SuccessResponse<CartResponse>) => ({
							...cartResponse,
							result: {
								...cartResponse.result,
								products: response.result.products,
								profile: response.result.profile,
							},
						})),
					),
				),
				map((cartDetailsResponse: SuccessResponse<CartDetailsResponse>) => {
					this.cart.set(cartDetailsResponse.result);
					this.productList.set(cartDetailsResponse.result.products.results);
				}),
			)
			.subscribe();
	}
}
