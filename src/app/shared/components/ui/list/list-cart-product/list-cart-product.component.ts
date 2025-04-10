import { CommonModule } from '@angular/common';
import { Component, InputSignal, OutputEmitterRef, WritableSignal, inject, input, output, signal } from '@angular/core';
import { QuantityChangedEvent } from '@models/changed/quantity-changed-event.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { CartService } from '@services/cart.service';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { QuantityFormComponent } from '@shared/components/ui/form/form/quantity-form/quantity-form.component';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-list-cart-product',
	imports: [CommonModule, TableModule, ImageModule, ButtonIconSmallComponent, QuantityFormComponent],
	templateUrl: './list-cart-product.component.html',
	styleUrl: './list-cart-product.component.scss',
})
export class ListCartProductComponent {
	private _cartService: CartService = inject(CartService);

	public productListItems: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	public productList: InputSignal<ProductToCartResponse[]> = input.required<ProductToCartResponse[]>();

	public tableColumnNames = ['product', 'price', 'quantity', 'total'];

	public notifListChange: OutputEmitterRef<void> = output<void>();

	public removeFromCart(productCartId: string): void {
		this._cartService
			.removeProductFromCart(productCartId)
			.pipe(
				tap(() => {
					const updatedList: ProductToCartResponse[] = this.productList().filter(
						(product: ProductToCartResponse) => product.id !== productCartId,
					);
					this.productListItems.set(updatedList);
					this.notifListChange.emit();
				}),
			)
			.subscribe({});
	}

	public onQuantityUpdated(event: QuantityChangedEvent): void {
		const updatedList = this.productList().map(product => {
			if (product.id === event.productId) {
				return { ...product, quantity: event.quantity };
			}
			return product;
		});

		this.productListItems.set(updatedList);
		this.notifListChange.emit();
	}
}
