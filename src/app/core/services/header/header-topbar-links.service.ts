import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { RouteEnum } from '@enum/route.enum';
import { HeaderTopBarLink } from '@models/header/header-topbar-link.model';

@Injectable({
	providedIn: 'root',
})
export class HeaderTopbarLinkService {
	private _headerTopBarLinks: WritableSignal<HeaderTopBarLink[]> = signal<HeaderTopBarLink[]>([
		{
			label: 'Help?',
			link: '/' + RouteEnum.FAQ,
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
		return this._headerTopBarLinks;
	}
}
