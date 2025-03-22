import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { ProductsDetailsPageComponent } from '@features/product/products-details-page/products-details-page.component';
import { ProductsPageComponent } from '@features/product/products-page/products-page.component';

export const routes: Routes = [
	{ path: '', component: ProductsPageComponent, data: { title: 'products' } },
	{ path: RouteEnum.DETAILS, component: ProductsDetailsPageComponent, data: { title: 'product' } },
];
