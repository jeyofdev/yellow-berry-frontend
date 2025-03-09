import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { HeaderAccountLink } from '@models/header-account-link.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderAccountLinkService {
	private _headerAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Login',
			sublabel: 'Account',
			link: '/',
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
		},
		{
			label: 'Login',
			sublabel: '',
			link: '/',
			icon: '',
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
