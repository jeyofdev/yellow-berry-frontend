import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { CheckEmailPageComponent } from '@features/auth/pages/check-email-page/check-email-page.component';
import { ConfirmResetPasswordPageComponent } from '@features/auth/pages/confirm-reset-password-page/confirm-reset-password-page.component';
import { ForgotPasswordPageComponent } from '@features/auth/pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from '@features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@features/auth/pages/register-page/register-page.component';
import { ResetPasswordPageComponent } from '@features/auth/pages/reset-password-page/reset-password-page.component';
import { loggedGuard } from '@guards/logged.guard';

export const routes: Routes = [
	{ path: RouteEnum.LOGIN, component: LoginPageComponent, canActivate: [loggedGuard], data: { title: 'login' } },
	{
		path: RouteEnum.REGISTER,
		component: RegisterPageComponent,
		canActivate: [loggedGuard],
		data: { title: 'register' },
	},
	{
		path: RouteEnum.FORGOT_PASSWORD,
		component: ForgotPasswordPageComponent,
		canActivate: [loggedGuard],
		data: { title: 'forgot password' },
	},
	{
		path: RouteEnum.CHECK_EMAIL,
		component: CheckEmailPageComponent,
		canActivate: [loggedGuard],
		data: { title: 'check email' },
	},
	{
		path: RouteEnum.RESET_PASSORD,
		component: ResetPasswordPageComponent,
		canActivate: [loggedGuard],
		data: { title: 'reset password' },
	},
	{
		path: RouteEnum.RESET_PASSORD_CONFIRM,
		component: ConfirmResetPasswordPageComponent,
		canActivate: [loggedGuard],
		data: { title: 'reset password' },
	},
];
