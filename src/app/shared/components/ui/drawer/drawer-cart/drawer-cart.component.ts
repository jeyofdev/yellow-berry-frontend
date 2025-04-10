import { CommonModule } from '@angular/common';
import { Component, InputSignal, OutputEmitterRef, WritableSignal, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CardProductCartComponent } from '@shared/components/ui/card/card-product-cart/card-product-cart.component';
import { CartTotalComponent } from '@shared/components/ui/cart/cart-total/cart-total.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { map } from 'rxjs';

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

	public productItemList: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	constructor() {
		this._loadProductList();
	}

	public onClose(): void {
		this.close.emit(false);
	}

	public redirectToCart(): void {
		this._router.navigateByUrl('/' + RouteEnum.ACCOUNT_CART);
	}

	public removeFromCart(productCartId: string): void {
		this._cartService.removeProductFromCart(productCartId).subscribe(() => {
			const updatedList = this.productItemList().filter(product => product.id !== productCartId);
			this.productItemList.set(updatedList);
		});
	}

	private _loadProductList(): void {
		this._cartService
			.findByUserId()
			.pipe(
				map((cartDetailsResponse: SuccessResponse<CartDetailsResponse>) => {
					this.productItemList.set(cartDetailsResponse.result.products.results);
				}),
			)
			.subscribe();
	}
}
