import { Component, InputSignal, input } from '@angular/core';
import { CartTotalItemComponent } from '@shared/components/ui/cart/cart-total-item/cart-total-item.component';

@Component({
	selector: 'app-cart-total',
	imports: [CartTotalItemComponent],
	templateUrl: './cart-total.component.html',
	styleUrl: './cart-total.component.scss',
})
export class CartTotalComponent {
	public subTotal: InputSignal<number> = input.required<number>();
	public amountTVA: InputSignal<number> = input.required<number>();
	public totalPrice: InputSignal<number> = input.required<number>();
}
