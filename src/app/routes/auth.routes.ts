import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { CheckEmailPageComponent } from '@features/auth/pages/check-email-page/check-email-page.component';
import { ConfirmResetPasswordPageComponent } from '@features/auth/pages/confirm-reset-password-page/confirm-reset-password-page.component';
import { ForgotPasswordPageComponent } from '@features/auth/pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from '@features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@features/auth/pages/register-page/register-page.component';
import { ResetPasswordPageComponent } from '@features/auth/pages/reset-password-page/reset-password-page.component';

export const routes: Routes = [
	{ path: RouteEnum.LOGIN, component: LoginPageComponent, data: { title: 'login' } },
	{ path: RouteEnum.REGISTER, component: RegisterPageComponent, data: { title: 'register' } },
	{ path: RouteEnum.FORGOT_PASSWORD, component: ForgotPasswordPageComponent, data: { title: 'forgot password' } },
	{ path: RouteEnum.AUTH_CHECK_EMAIL, component: CheckEmailPageComponent, data: { title: 'check email' } },
	{ path: RouteEnum.RESET_PASSORD, component: ResetPasswordPageComponent, data: { title: 'reset password' } },
	{
		path: RouteEnum.RESET_PASSORD_CONFIRM,
		component: ConfirmResetPasswordPageComponent,
		data: { title: 'reset password' },
	},
];
