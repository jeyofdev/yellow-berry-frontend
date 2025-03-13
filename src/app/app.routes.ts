import { Routes } from '@angular/router';
import { CheckEmailPageComponent } from '@features/auth/pages/check-email-page/check-email-page.component';
import { ConfirmResetPasswordPageComponent } from '@features/auth/pages/confirm-reset-password-page/confirm-reset-password-page.component';
import { ForgotPasswordPageComponent } from '@features/auth/pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from '@features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@features/auth/pages/register-page/register-page.component';
import { ResetPasswordPageComponent } from '@features/auth/pages/reset-password-page/reset-password-page.component';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';

export const routes: Routes = [
	{ path: 'home', component: HomePageComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'auth/login', component: LoginPageComponent, data: { title: 'login' } },
	{ path: 'auth/register', component: RegisterPageComponent, data: { title: 'register' } },
	{ path: 'auth/forgot-password', component: ForgotPasswordPageComponent, data: { title: 'forgot password' } },
	{ path: 'auth/check-email', component: CheckEmailPageComponent, data: { title: 'check email' } },
	{ path: 'auth/reset-password', component: ResetPasswordPageComponent, data: { title: 'reset password' } },
	{
		path: 'auth/reset-password/confirm',
		component: ConfirmResetPasswordPageComponent,
		data: { title: 'reset password' },
	},
];
