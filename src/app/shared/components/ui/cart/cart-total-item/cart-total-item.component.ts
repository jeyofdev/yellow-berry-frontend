import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { CartTotalTypeInput } from '@type/cart-input.type';

@Component({
	selector: 'app-cart-total-item',
	imports: [CommonModule],
	templateUrl: './cart-total-item.component.html',
	styleUrl: './cart-total-item.component.scss',
})
export class CartTotalItemComponent {
	public title: InputSignal<string> = input.required<string>();
	public value: InputSignal<number> = input.required<number>();
	public type: InputSignal<CartTotalTypeInput> = input.required<CartTotalTypeInput>();
}
