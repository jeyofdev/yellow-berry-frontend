import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
	tabTitles: { id: string; value: string }[] = [
		{ id: '0', value: 'Details' },
		{ id: '1', value: 'Informations' },
		{ id: '2', value: 'Reviews' },
	];

	productDetails: string[] = [
		'Lorem ipsum dolor sit amet.',
		'Consectetur adipiscing elit.',
		' Sed ut perspiciatis unde omnis.',
		' Nemo enim ipsam voluptatem quia voluptas.',
		'At vero eos et accusamus.',
	];

	productSpecificDetails: { name: string; value: string }[] = [
		{ name: 'Highlights', value: 'Lorem ipsum dolor sit amet.' },
		{ name: 'Seller', value: 'Consectetur adipiscing elit.' },
		{ name: 'services', value: ' Sed ut perspiciatis unde omnis.' },
	];

	productInformations: { name: string; value: string | number }[] = [
		{ name: 'Weight', value: '500g' },
		{ name: 'Dimensions', value: '17 × 15 × 3 cm' },
		{ name: 'Brand', value: 'lorem.' },
		{ name: 'Quantity', value: 5 },
		{ name: 'Color', value: 'black,yellow,red.' },
	];
}
