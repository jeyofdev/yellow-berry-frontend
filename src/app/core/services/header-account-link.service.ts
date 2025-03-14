import { Injectable, WritableSignal, inject } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { HeaderAccountLink } from '@models/header-account-link.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderAccountLinkService {
	private _router: Router = inject(Router);

	private _headerAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Login',
			sublabel: 'Account',
			link: '/auth/login',
			icon: 'account',
		},
		{
			label: 'Wishlist',
			sublabel: '3 items',
			link: '/',
			icon: 'wishlist',
		},
		{
			label: 'cart',
			sublabel: '4 items',
			link: '/',
			icon: 'cart',
		},
	]);

	private _noAuthAccountLinksChildren: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Register',
			sublabel: '',
			link: '/',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.AUTH_REGISTER),
		},
		{
			label: 'Login',
			sublabel: '',
			link: '/',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.AUTH_LOGIN),
		},
	]);

	private _authAccountLinksChildren: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Profile',
			sublabel: '',
			link: '/',
			icon: '',
		},
		{
			label: 'Logout',
			sublabel: '',
			link: '/',
			icon: '',
		},
	]);

	public getHeaderAccountLinks() {
		return this._headerAccountLinks;
	}

	public getNoAuthAccountLinksChildren() {
		return this._noAuthAccountLinksChildren;
	}

	public getAuthAccountLinksChildren() {
		return this._authAccountLinksChildren;
	}
}
