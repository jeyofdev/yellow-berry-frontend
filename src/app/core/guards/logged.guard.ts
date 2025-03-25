import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { AuthService } from '@services/auth/auth.service';

export const loggedGuard: CanActivateFn = () => {
	const _authService: AuthService = inject(AuthService);
	const _router: Router = inject(Router);

	if (_authService.getLoggedIn()) {
		_router.navigateByUrl(RouteEnum.PRODUCT);
		return false;
	}

	return true;
};
