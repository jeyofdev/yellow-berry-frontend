import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListCartProductComponent } from '@shared/components/ui/list/list-cart-product/list-cart-product.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-cart-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ListCartProductComponent, ButtonModule],
	templateUrl: './cart-page.component.html',
	styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {}
