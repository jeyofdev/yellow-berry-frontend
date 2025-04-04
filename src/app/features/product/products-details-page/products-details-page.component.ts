import { Component, InputSignal, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CardProductDetailsComponent } from '@shared/components/ui/card/card-product-details/card-product-details.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { TabsComponent } from '@shared/components/ui/tabs/tabs/tabs.component';

@Component({
	selector: 'app-products-details-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, CardProductDetailsComponent, TabsComponent],
	templateUrl: './products-details-page.component.html',
	styleUrl: './products-details-page.component.scss',
})
export class ProductsDetailsPageComponent {
	private _productService: ProductService = inject(ProductService);

	public id: InputSignal<string> = input.required<string>();
	public product: WritableSignal<ProductDetailsResponse | null> = signal<ProductDetailsResponse | null>(null);

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
