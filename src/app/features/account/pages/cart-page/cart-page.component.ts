import { Component, inject } from '@angular/core';

import { CartComponentService } from '@services/components/cart-component.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CartTotalComponent } from '@shared/components/ui/cart/cart-total/cart-total.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListCartProductComponent } from '@shared/components/ui/list/list-cart-product/list-cart-product.component';

@Component({
	selector: 'app-cart-page',
	imports: [
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		ListCartProductComponent,
		CartTotalComponent,
		ButtonCtaLargeComponent,
	],
	templateUrl: './cart-page.component.html',
	styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
	protected _cartComponentService = inject(CartComponentService);

	public cart = this._cartComponentService.cart;
	public productList = this._cartComponentService.productList;
	public subTotalPrice = this._cartComponentService.subTotalPrice;
	public totalPrice = this._cartComponentService.totalPrice;

	public refreshCart(): void {
		this._cartComponentService.refreshCart();
	}
}
