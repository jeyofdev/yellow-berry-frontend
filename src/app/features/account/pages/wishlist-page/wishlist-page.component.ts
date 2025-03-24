import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { map } from 'rxjs';

@Component({
	selector: 'app-wishlist-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ListProductComponent],
	templateUrl: './wishlist-page.component.html',
	styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent {
	private _productService: ProductService = inject(ProductService);
	public productItemList: Signal<ProductResponse[]> = this.getProductItemList();

	private getProductItemList(): Signal<ProductResponse[]> {
		return toSignal(
			this._productService
				.findAll()
				.pipe(map((productResponse: SuccessResponse<ProductResponse[]>) => productResponse.result)),
			{ initialValue: [] },
		);
	}
}
