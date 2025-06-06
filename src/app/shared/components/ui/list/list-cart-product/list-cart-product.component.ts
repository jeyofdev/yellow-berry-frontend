import { CommonModule } from '@angular/common';
import {
	Component,
	InputSignal,
	OutputEmitterRef,
	WritableSignal,
	effect,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { QuantityChangedEvent } from '@models/changed/quantity-changed-event.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { CartService } from '@services/cart.service';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { QuantityFormComponent } from '@shared/components/ui/form/form/quantity-form/quantity-form.component';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'app-list-cart-product',
	imports: [CommonModule, RouterModule, TableModule, ImageModule, ButtonIconSmallComponent, QuantityFormComponent],
	templateUrl: './list-cart-product.component.html',
	styleUrl: './list-cart-product.component.scss',
})
export class ListCartProductComponent {
	private _cartService: CartService = inject(CartService);

	public routeEnum = RouteEnum;

	public productList: InputSignal<ProductToCartResponse[]> = input.required<ProductToCartResponse[]>();
	public notifListChange: OutputEmitterRef<void> = output<void>();

	public productListItems: WritableSignal<ProductToCartResponse[]> = signal<ProductToCartResponse[]>([]);

	public tableColumnNames = ['product', 'price', 'quantity', 'total'];

	constructor() {
		effect(() => {
			const list = this.productList();
			this.productListItems.set(list);
		});
	}

	public removeFromCart(productCartId: string): void {
		this._cartService.removeProductFromCart(productCartId).subscribe(() => {
			const updated = this.productListItems().filter((product: ProductToCartResponse) => product.id !== productCartId);
			this.productListItems.set(updated);
			this.notifListChange.emit();
		});
	}

	public onQuantityUpdated(event: QuantityChangedEvent): void {
		const updatedList = this.productListItems().map((product: ProductToCartResponse) => {
			return product.id === event.productId ? { ...product, quantity: event.quantity } : product;
		});

		this.productListItems.set(updatedList);
		this.notifListChange.emit();
	}
}
