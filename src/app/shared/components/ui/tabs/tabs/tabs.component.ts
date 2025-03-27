import { Component, InputSignal, input } from '@angular/core';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { TabsModule } from 'primeng/tabs';
import { TabLiComponent } from '../tab-li/tab-li.component';
import { TablistComponent } from '../tablist/tablist.component';

@Component({
	selector: 'app-tabs',
	imports: [TabsModule, TablistComponent, TabLiComponent],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss',
})
export class TabsComponent {
	public product: InputSignal<ProductDetailsResponse | null> = input.required<ProductDetailsResponse | null>();

	public tabTitles: { id: string; value: string }[] = [
		{ id: '0', value: 'Details' },
		{ id: '1', value: 'Informations' },
		{ id: '2', value: 'Reviews' },
	];

	public productDetails: string[] = [
		'Lorem ipsum dolor sit amet.',
		'Consectetur adipiscing elit.',
		' Sed ut perspiciatis unde omnis.',
		' Nemo enim ipsam voluptatem quia voluptas.',
		'At vero eos et accusamus.',
	];

	public productSpecificDetails: { name: string; value: string }[] = [
		{ name: 'Highlights', value: 'Lorem ipsum dolor sit amet.' },
		{ name: 'Seller', value: 'Consectetur adipiscing elit.' },
		{ name: 'services', value: ' Sed ut perspiciatis unde omnis.' },
	];

	public productInformations(): { name: string; value: string | number }[] {
		if (!this.product()) {
			return [];
		}

		return [
			{ name: 'Weight', value: this.convertWeightToString() },
			{ name: 'Dimensions', value: '17 × 15 × 3 cm' },
			{ name: 'Brand', value: 'lorem.' },
			{ name: 'Quantity', value: 5 },
			{ name: 'Color', value: this.convertColorsToString() },
		];
	}

	private convertColorsToString(): string {
		if (!this.product()) {
			return '';
		} else {
			const product = this.product();
			return product && product.informations.colorList.length > 0 ? product.informations.colorList.join(', ') : '';
		}
	}

	private convertWeightToString(): string {
		if (!this.product()) {
			return '';
		} else {
			const product = this.product();
			return product && product.informations.weightList.length > 0 ? product.informations.weightList.join(', ') : '';
		}
	}
}
