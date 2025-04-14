import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { ProductNotFoundPageComponent } from '@features/error/pages/product-not-found-page/product-not-found-page.component';
import { ProductsDetailsPageComponent } from '@features/product/products-details-page/products-details-page.component';
import { ProductsPageComponent } from '@features/product/products-page/products-page.component';

export const routes: Routes = [
	{ path: '', component: ProductsPageComponent, data: { title: 'products' } },
	{
		path: RouteEnum.NOT_FOUND,
		component: ProductNotFoundPageComponent,
		data: { title: 'product not found' },
	},
	{
		path: RouteEnum.DETAILS,
		component: ProductsDetailsPageComponent,
		data: { title: 'product' },
	},
];
