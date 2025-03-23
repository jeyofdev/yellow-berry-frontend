import { CommonModule } from '@angular/common';
import { Component, InputSignal, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CardProductDetailsComponent } from '@shared/components/ui/card/card-product-details/card-product-details.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';

import { TabsModule } from 'primeng/tabs';

@Component({
	selector: 'app-products-details-page',
	imports: [
		CommonModule,
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		CardProductDetailsComponent,
		TabsModule,
	],
	templateUrl: './products-details-page.component.html',
	styleUrl: './products-details-page.component.scss',
})
export class ProductsDetailsPageComponent {
	private _productService: ProductService = inject(ProductService);

	id: InputSignal<string> = input.required<string>();
	product: WritableSignal<ProductDetailsResponse | null> = signal<ProductDetailsResponse | null>(null);

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

	constructor() {
		effect(() => {
			const productId = this.id();
			if (productId) {
				this._productService.findById({ productId }).subscribe((response: SuccessResponse<ProductDetailsResponse>) => {
					this.product.set(response.result);
				});
			}
		});
	}
}
