import { CommonModule } from '@angular/common';
import {
	Component,
	InputSignal,
	OutputEmitterRef,
	WritableSignal,
	computed,
	effect,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { CartResponse } from '@models/cart/cart-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CardProductCartComponent } from '@shared/components/ui/card/card-product-cart/card-product-cart.component';
import { CartTotalComponent } from '@shared/components/ui/cart/cart-total/cart-total.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { map, shareReplay, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-drawer-cart',
	imports: [
		CommonModule,
		DrawerModule,
		DividerModule,
		ButtonModule,
		CardProductCartComponent,
		CartTotalComponent,
		ButtonCtaLargeComponent,
	],
	templateUrl: './drawer-cart.component.html',
	styleUrl: './drawer-cart.component.scss',
})
export class DrawerCartComponent {
	private _cartService: CartService = inject(CartService);
	private _router: Router = inject(Router);

	public isVisible: InputSignal<boolean> = input<boolean>(false);
	public close: OutputEmitterRef<boolean> = output();

	private refreshCartDatasTrigger = signal(0);
	private removeProductTrigger = signal<string | null>(null);

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

		effect(() => {
			const productId = this.removeProductTrigger();
			if (!productId) return;
			this._cartService
				.removeProductFromCart(productId)
				.pipe(
					tap(() => {
						this.refreshCart();
						this.removeProductTrigger.set(null);
					}),
				)
				.subscribe();
		});
	}

	public refreshCart(): void {
		this.refreshCartDatasTrigger.update(v => v + 1);
	}

	public onClose(): void {
		this.close.emit(false);
	}

	public redirectToCart(): void {
		this._router.navigateByUrl('/' + RouteEnum.ACCOUNT_CART);
	}

	public removeFromCart(productCartId: string): void {
		this.removeProductTrigger.set(productCartId);
	}
}
