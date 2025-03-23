import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-price-discount',
	imports: [CommonModule],
	templateUrl: './price-discount.component.html',
	styleUrl: './price-discount.component.scss',
})
export class PriceDiscountComponent {
	public price: InputSignal<number> = input.required<number>();
	public priceDiscount: InputSignal<number> = input.required<number>();
}
