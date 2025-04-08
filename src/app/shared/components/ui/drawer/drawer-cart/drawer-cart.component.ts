import { CommonModule } from '@angular/common';
import { Component, InputSignal, OutputEmitterRef, WritableSignal, inject, input, output, signal } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { NumberStepFieldComponent } from '@shared/components/ui/form/number-step-field/number-step-field.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { ImageModule } from 'primeng/image';
import { map, tap } from 'rxjs';

@Component({
	selector: 'app-drawer-cart',
	imports: [
		CommonModule,
		DrawerModule,
		NumberStepFieldComponent,
		ImageModule,
		DividerModule,
		ButtonModule,
		ButtonIconSmallComponent,
	],
	templateUrl: './drawer-cart.component.html',
	styleUrl: './drawer-cart.component.scss',
})
export class DrawerCartComponent {
	private _cartService: CartService = inject(CartService);

	public isVisible: InputSignal<boolean> = input<boolean>(false);

	public close: OutputEmitterRef<boolean> = output();

	public productItemList: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	public productNb: number = 1;

	constructor() {
		this._loadWishlist();
	}

	public onClose(): void {
		this.close.emit(false);
	}

	public removeFromCart(productCartId: string): void {
		this._cartService.removeProductFromCart(productCartId).subscribe(() => {
			const updatedList = this.productItemList().filter(product => product.id !== productCartId);
			this.productItemList.set(updatedList);
		});
	}

	private _loadWishlist(): void {
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
