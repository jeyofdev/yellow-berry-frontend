import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { HeaderAccountLink } from '@models/header-account-link.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderAccountLinkService {
	private headerAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
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

	private noAuthAccountLinksChildren: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
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

	private authAccountLinksChildren: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
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
		return this.headerAccountLinks;
	}

	public getNoAuthAccountLinksChildren() {
		return this.noAuthAccountLinksChildren;
	}

	public getAuthAccountLinksChildren() {
		return this.authAccountLinksChildren;
	}
}
