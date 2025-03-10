import { Routes } from '@angular/router';
import { LoginPageComponent } from '@features/auth/pages/login-page/login-page.component';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';

export const routes: Routes = [
	{ path: 'home', component: HomePageComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'auth/login', component: LoginPageComponent, data: { title: 'login' } },
];
