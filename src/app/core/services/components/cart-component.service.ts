import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { AuthService } from '@services/auth/auth.service';
import { CartService } from '@services/cart.service';
import { map, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CartComponentService {
	private _cartService: CartService = inject(CartService);
	private _authService: AuthService = inject(AuthService);

	private refreshCartDatasTrigger = signal(0);
	public cart = signal<CartDetailsResponse | null>(null);

	public productList = computed<ProductToCartResponse[]>(() => {
		return this.cart()?.products?.results ?? [];
	});

	public productCountInCart = computed(() => this.productList().length);
	public subTotalPrice = computed(() => this.cart()?.subTotalPrice ?? 0);
	public totalPrice = computed(() => this.cart()?.totalPrice ?? 0);

	constructor() {
		effect(() => {
			if (this._authService.getLoggedIn()) {
				this.refreshCartDatasTrigger();
				this.loadCart();
			}
		});
	}

	public loadCart(): void {
		this._cartService
			.findByUserId()
			.pipe(
				switchMap((response: SuccessResponse<CartDetailsResponse>) =>
					this._cartService.update(response.result.id).pipe(
						map((updatedCart: SuccessResponse<CartDetailsResponse>) => {
							this.cart.set(updatedCart.result);
						}),
					),
				),
			)
			.subscribe();
	}

	public refreshCart(): void {
		this.refreshCartDatasTrigger.update((oldValue: number) => oldValue + 1);
	}
}
