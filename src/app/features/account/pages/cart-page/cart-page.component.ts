import { Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';

import { CartComponentService } from '@services/components/cart-component.service';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CarouselProductComponent } from '@shared/components/ui/carousel/carousel-product/carousel-product.component';
import { CartTotalComponent } from '@shared/components/ui/cart/cart-total/cart-total.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListCartProductComponent } from '@shared/components/ui/list/list-cart-product/list-cart-product.component';
import { map } from 'rxjs';

@Component({
	selector: 'app-cart-page',
	imports: [
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		ListCartProductComponent,
		CartTotalComponent,
		ButtonCtaLargeComponent,
		CarouselProductComponent,
	],
	templateUrl: './cart-page.component.html',
	styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
	protected _cartComponentService = inject(CartComponentService);
	private _productService: ProductService = inject(ProductService);

	public lastProductList: Signal<ProductResponse[]> = this._getLastProductList();

	public cart = this._cartComponentService.cart;
	public productList = this._cartComponentService.productList;
	public subTotalPrice = this._cartComponentService.subTotalPrice;
	public totalPrice = this._cartComponentService.totalPrice;

	public refreshCart(): void {
		this._cartComponentService.refreshCart();
	}

	private _getLastProductList(): Signal<ProductResponse[]> {
		return toSignal(
			this._productService
				.findTopProductsByDiscount()
				.pipe(map((productResponse: SuccessResponse<ProductResponse[]>) => productResponse.result)),
			{ initialValue: [] },
		);
	}
}
