import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { AuthService } from '@services/auth/auth.service';

export const authGuard: CanActivateFn = (_, state: RouterStateSnapshot) => {
	const _authService: AuthService = inject(AuthService);
	const _router: Router = inject(Router);

	if (_authService.getLoggedIn()) {
		return true;
	}

	_router.navigate(['/' + RouteEnum.AUTH_LOGIN], { queryParams: { returnUrl: state.url } });

	return false;
};
