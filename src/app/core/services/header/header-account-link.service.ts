import { Injectable, WritableSignal, effect, inject } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { HeaderAccountLink } from '@models/header/header-account-link.model';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class HeaderAccountLinkService {
	private _router: Router = inject(Router);
	private _authService: AuthService = inject(AuthService);

	constructor() {
		effect(() => {
			this.setAuthAccountLinks();
		});
	}

	private _headerAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Login',
			sublabel: 'Account',
			icon: 'account',
		},
		{
			label: 'Wishlist',
			sublabel: '3 items',
			icon: 'wishlist',
			redirectTo: '/' + RouteEnum.ACCOUNT_WISHLIST,
		},
		{
			label: 'cart',
			sublabel: '4 items',
			icon: 'cart',
		},
	]);

	private _authAccountLinksChildren: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([]);

	private _notConnectedAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Register',
			sublabel: '',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.AUTH_REGISTER),
		},
		{
			label: 'Login',
			sublabel: '',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.AUTH_LOGIN),
		},
	]);

	private _connectedAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Profile',
			sublabel: '',
			icon: '',
		},
		{
			label: 'Logout',
			sublabel: '',
			icon: '',
			command: () => {
				this._authService.logout();
				this._router.navigateByUrl('/' + RouteEnum.HOME);
			},
		},
	]);

	public getHeaderAccountLinks() {
		return this._headerAccountLinks;
	}

	public getAuthAccountLinks() {
		return this._authAccountLinksChildren;
	}

	public setAuthAccountLinks() {
		if (this._authService.getLoggedIn()) {
			this._authAccountLinksChildren.set(this._connectedAccountLinks());
		} else {
			this._authAccountLinksChildren.set(this._notConnectedAccountLinks());
		}

		return this._authAccountLinksChildren;
	}
}
