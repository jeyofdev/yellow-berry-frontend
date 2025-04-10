import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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
import { map, shareReplay, switchMap } from 'rxjs';

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

	private refreshCartDatasTrigger = signal(0);

	private cartDetails$ = toObservable(this.refreshCartDatasTrigger).pipe(
		switchMap(() =>
			this._cartService.findByUserId().pipe(
				switchMap((response: SuccessResponse<CartDetailsResponse>) =>
					this._cartService.update(response.result.id).pipe(
						map((updatedCart: SuccessResponse<CartResponse>) => ({
							...updatedCart.result,
							products: response.result.products,
							profile: response.result.profile,
						})),
					),
				),
			),
		),
		shareReplay(1),
	);

	public cart = toSignal(this.cartDetails$, { initialValue: null });
	public productList = computed<ProductToCartResponse[]>(() => {
		return this.cart()?.products?.results ?? [];
	});

	public subTotalPrice = computed(() => this.cart()?.subTotalPrice ?? 0);
	public totalPrice = computed(() => this.cart()?.totalPrice ?? 0);

	constructor() {
		effect(() => {
			this.refreshCartDatasTrigger();
		});
	}

	public refreshCart(): void {
		this.refreshCartDatasTrigger.update(v => v + 1);
	}
}
