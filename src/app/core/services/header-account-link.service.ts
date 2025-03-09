import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { HeaderAccountLink } from '@models/header-account-link.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderAccountLinkService {
	private headerAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<
		HeaderAccountLink[]
	>([
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

	public getHeaderAccountLinks() {
		return this.headerAccountLinks;
	}
}
