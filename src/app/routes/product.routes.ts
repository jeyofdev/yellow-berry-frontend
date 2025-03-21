import { Routes } from '@angular/router';
import { ProductsPageComponent } from '@features/product/products-page/products-page.component';

export const routes: Routes = [{ path: '', component: ProductsPageComponent, data: { title: 'products' } }];
