import { Component, InputSignal, Signal, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CardProductDetailsComponent } from '@shared/components/ui/card/card-product-details/card-product-details.component';
import { CarouselProductComponent } from '@shared/components/ui/carousel/carousel-product/carousel-product.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { TabsComponent } from '@shared/components/ui/tabs/tabs/tabs.component';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-products-details-page',
	imports: [
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		CardProductDetailsComponent,
		TabsComponent,
		CarouselProductComponent,
	],
	templateUrl: './products-details-page.component.html',
	styleUrl: './products-details-page.component.scss',
})
export class ProductsDetailsPageComponent {
	private _router: Router = inject(Router);
	private _productService: ProductService = inject(ProductService);

	public id: InputSignal<string> = input.required<string>();

	public product = this._loadProductSignal();
	public relatedProductList: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	constructor() {
		effect(() => {
			const product = this.product();
			if (product) {
				this._loadRelatedProductList(product.id, product.categories.results[0].id);
			}
		});
	}

	private _loadProductSignal() {
		return toSignal(
			toObservable(this.id).pipe(
				switchMap(productId =>
					this._productService.findById({ productId }).pipe(
						map((response: SuccessResponse<ProductDetailsResponse>) => response.result),
						catchError(error => {
							if (error.status === 400 || error.status === 404) {
								this._router.navigateByUrl(RouteEnum.PRODUCT_NOT_FOUND);
							}
							return of(null);
						}),
					),
				),
			),
			{ initialValue: null },
		);
	}

	private _loadRelatedProductList(productId: string, categoryId: string): void {
		this._productService
			.findByCategoryIdOrderedByIdExcludingProductId({ productId, categoryId })
			.pipe(
				map((productResponse: SuccessResponse<ProductResponse[]>) =>
					this.relatedProductList.set(productResponse.result),
				),
				catchError(() => of([])),
			)
			.subscribe();
	}
}
