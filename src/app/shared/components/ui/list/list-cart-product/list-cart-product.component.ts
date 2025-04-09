import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { QuantityChangedEvent } from '@models/changed/quantity-changed-event.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { QuantityFormComponent } from '@shared/components/ui/form/form/quantity-form/quantity-form.component';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';

@Component({
	selector: 'app-list-cart-product',
	imports: [CommonModule, TableModule, ImageModule, ButtonIconSmallComponent, QuantityFormComponent],
	templateUrl: './list-cart-product.component.html',
	styleUrl: './list-cart-product.component.scss',
})
export class ListCartProductComponent {
	private _cartService: CartService = inject(CartService);

	public productList: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	public tableColumnNames = ['product', 'price', 'quantity', 'total'];

	constructor() {
		this._loadProductList();
	}

	public removeFromCart(productCartId: string): void {
		this._cartService.removeProductFromCart(productCartId).subscribe(() => {
			const updatedList: ProductToCartResponse[] = this.productList().filter(
				(product: ProductToCartResponse) => product.id !== productCartId,
			);
			this.productList.set(updatedList);
		});
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

	public onQuantityUpdated(event: QuantityChangedEvent): void {
		const updatedList = this.productList().map(product => {
			if (product.id === event.productId) {
				return { ...product, quantity: event.quantity };
			}
			return product;
		});
		this.productList.set(updatedList);
	}
}
