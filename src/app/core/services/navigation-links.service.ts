import { Injectable, WritableSignal, signal } from '@angular/core';
import { NavigationLink } from '@models/navigation-links.model';

@Injectable({
	providedIn: 'root',
})
export class NavigationLinksService {
	private _navigationLinks: WritableSignal<NavigationLink[]> = signal<NavigationLink[]>([
		{
			label: 'Home',
			link: '/',
			icon: '',
		},
		{
			label: 'Products',
			link: '/',
			icon: 'pi pi-circle',
		},
		{
			label: 'About',
			link: '/',
			icon: 'pi pi-circle',
		},
		{
			label: 'Contact',
			link: '/',
			icon: 'pi pi-circle',
		},
	]);

	public getNavigationLinks() {
		return this._navigationLinks;
	}
}
