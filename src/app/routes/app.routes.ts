import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';

export const routes: Routes = [
	{ path: RouteEnum.HOME, component: HomePageComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: RouteEnum.AUTH, loadChildren: () => import('./auth.routes').then(m => m.routes) },
];
