import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { AuthTokenService } from '@services/auth/auth-token.service';
import { AuthService } from '@services/auth/auth.service';
import { LocalStorageService } from '@services/auth/local-storage.service';

export const authGuard: CanActivateFn = (_, state: RouterStateSnapshot) => {
	const _authService: AuthService = inject(AuthService);
	const _authTokenService: AuthTokenService = inject(AuthTokenService);
	const _router: Router = inject(Router);
	const _localStorageService: LocalStorageService = inject(LocalStorageService);

	const authToken: string | null = _localStorageService.getAuthToken();

	if (authToken && !_authTokenService.isTokenExpired(authToken) && _authService.getLoggedIn()) {
		return true;
	}

	_localStorageService.clearAuthToken();
	_router.navigate(['/' + RouteEnum.AUTH_LOGIN], { queryParams: { returnUrl: state.url } });

	return false;
};
