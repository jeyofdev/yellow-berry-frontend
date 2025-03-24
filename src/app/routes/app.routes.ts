import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { AboutPageComponent } from '@features/about/pages/about-page/about-page.component';
import { FaqPageComponent } from '@features/faq/pages/faq-page/faq-page.component';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';

export const routes: Routes = [
	{ path: RouteEnum.HOME, component: HomePageComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: RouteEnum.FAQ, component: FaqPageComponent },
	{ path: RouteEnum.ABOUT, component: AboutPageComponent },
	{ path: RouteEnum.AUTH, loadChildren: () => import('./auth.routes').then(m => m.routes) },
	{ path: RouteEnum.ACCOUNT, loadChildren: () => import('./account.routes').then(m => m.routes) },
	{ path: RouteEnum.PRODUCT, loadChildren: () => import('./product.routes').then(m => m.routes) },
];
