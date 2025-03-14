import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { NavigationLink } from '@models/navigation-links.model';

@Injectable({
	providedIn: 'root',
})
export class NavigationLinksService {
	private _router: Router = inject(Router);

	private _navigationLinks: WritableSignal<NavigationLink[]> = signal<NavigationLink[]>([
		{
			label: 'Home',
			link: '/',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.HOME),
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
