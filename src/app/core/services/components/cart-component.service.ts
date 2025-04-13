import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { CartResponse } from '@models/cart/cart-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { map, shareReplay, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CartComponentService {
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
	public productCountInCart = computed(() => this.productList().length);

	public subTotalPrice = computed(() => this.cart()?.subTotalPrice ?? 0);
	public totalPrice = computed(() => this.cart()?.totalPrice ?? 0);

	constructor() {
		effect(() => {
			this.refreshCartDatasTrigger();
		});
	}

	public refreshCart(): void {
		this.refreshCartDatasTrigger.update((oldValue: number) => oldValue + 1);
	}
}
