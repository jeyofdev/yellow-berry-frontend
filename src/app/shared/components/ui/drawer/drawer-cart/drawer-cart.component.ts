import { CommonModule } from '@angular/common';
import { Component, InputSignal, OutputEmitterRef, effect, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { CartService } from '@services/cart.service';
import { CartComponentService } from '@services/components/cart-component.service';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CardProductCartComponent } from '@shared/components/ui/card/card-product-cart/card-product-cart.component';
import { CartTotalComponent } from '@shared/components/ui/cart/cart-total/cart-total.component';
import { AlertComponent } from '@shared/components/ui/messages/alert/alert.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { tap } from 'rxjs';

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
		AlertComponent,
	],
	templateUrl: './drawer-cart.component.html',
	styleUrl: './drawer-cart.component.scss',
})
export class DrawerCartComponent {
	private _cartService: CartService = inject(CartService);
	protected _cartComponentService = inject(CartComponentService);
	private _router: Router = inject(Router);

	public isVisible: InputSignal<boolean> = input<boolean>(false);
	public close: OutputEmitterRef<boolean> = output();

	private removeProductTrigger = signal<string | null>(null);

	public cart = this._cartComponentService.cart;
	public productList = this._cartComponentService.productList;
	public subTotalPrice = this._cartComponentService.subTotalPrice;
	public totalPrice = this._cartComponentService.totalPrice;

	constructor() {
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
		this._cartComponentService.refreshCart();
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
