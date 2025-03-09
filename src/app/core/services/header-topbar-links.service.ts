import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { HeaderTopBarLink } from '@models/header-topbar-link.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderTopbarLinkService {
	private headerTopBarLinks: WritableSignal<HeaderTopBarLink[]> = signal<
		HeaderTopBarLink[]
	>([
		{
			label: 'Help?',
			link: '/',
		},
		{
			label: 'Track order',
			link: '/',
		},
		{
			label: 'Language',
			link: '/',
		},
		{
			label: 'Currency',
			link: '/',
		},
	]);

	public getHeaderTopBarLinks() {
		return this.headerTopBarLinks;
	}
}
