import { CommonModule } from '@angular/common';
import { Component, InputSignal, Signal, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
	selector: 'app-products-details-page',
	imports: [
		CommonModule,
		FormsModule,
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		ImageModule,
		RatingComponent,
		ButtonModule,
		InputNumberModule,
	],
	templateUrl: './products-details-page.component.html',
	styleUrl: './products-details-page.component.scss',
})
export class ProductsDetailsPageComponent {
	private _productService: ProductService = inject(ProductService);

	id: InputSignal<string> = input.required<string>();
	product: WritableSignal<ProductDetailsResponse | null> = signal<ProductDetailsResponse | null>(null);

	weightValues: string[] = ['250g', '500g', '1kg', '2kg'];
	productNb: number = 1;

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
