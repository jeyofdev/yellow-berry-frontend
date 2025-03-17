import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { NavigationLink } from '@models/header/navigation-links.model';

@Injectable({
	providedIn: 'root',
})
export class NavigationLinksService {
	private _router: Router = inject(Router);

	private _navigationLinks: WritableSignal<NavigationLink[]> = signal<NavigationLink[]>([
		{
			label: 'Home',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.HOME),
		},
		{
			label: 'Products',
			icon: 'pi pi-circle',
			command: () => this._router.navigateByUrl('/' + RouteEnum.HOME),
		},
		{
			label: 'About',
			icon: 'pi pi-circle',
			command: () => this._router.navigateByUrl('/' + RouteEnum.ABOUT),
		},
		{
			label: 'Contact',
			icon: 'pi pi-circle',
			command: () => this._router.navigateByUrl('/' + RouteEnum.HOME),
		},
	]);

	public getNavigationLinks() {
		return this._navigationLinks;
	}
}
