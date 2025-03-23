import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-price-discount-percentage',
	imports: [CommonModule],
	templateUrl: './price-discount-percentage.component.html',
	styleUrl: './price-discount-percentage.component.scss',
})
export class PriceDiscountPercentageComponent {
	public priceDiscount: InputSignal<number> = input.required<number>();
	public discount: InputSignal<number> = input.required<number>();
}
