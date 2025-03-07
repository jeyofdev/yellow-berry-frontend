import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { HeaderTopBarLink } from '@models/HeaderTopbarLink.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderTopbarLinkService {
	private topBarLinks: WritableSignal<HeaderTopBarLink[]> = signal<
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

	public getTopBarLinks() {
		return this.topBarLinks;
	}
}
