import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BrandResponse } from '@models/brand/brand-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { BrandService } from '@services/brand.service';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CarouselBrandComponent } from '@shared/components/ui/carousel/carousel-brand/carousel-brand.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { map } from 'rxjs';

@Component({
	selector: 'app-products-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, CarouselBrandComponent, ListProductComponent],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
	private _brandService: BrandService = inject(BrandService);
	private _productService: ProductService = inject(ProductService);

	public brandItemList: Signal<BrandResponse[]> = this.getBrandItemList();
	public productItemList: Signal<ProductResponse[]> = this.getProductItemList();

	private getBrandItemList(): Signal<BrandResponse[]> {
		return toSignal(
			this._brandService.findAll().pipe(map((brandResponse: SuccessResponse<BrandResponse[]>) => brandResponse.result)),
			{ initialValue: [] },
		);
	}

	private getProductItemList(): Signal<ProductResponse[]> {
		return toSignal(
			this._productService
				.findAll()
				.pipe(map((productResponse: SuccessResponse<ProductResponse[]>) => productResponse.result)),
			{ initialValue: [] },
		);
	}
}
