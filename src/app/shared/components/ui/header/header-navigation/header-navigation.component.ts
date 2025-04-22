import { Component, OnInit, Signal, ViewChild, WritableSignal, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { HeaderAccountLink } from '@models/header/header-account-link.model';
import { AuthService } from '@services/auth/auth.service';
import { HeaderAccountLinkService } from '@services/header/header-account-link.service';
import { ButtonCtaSearchComponent } from '@shared/components/ui/buttons/button-cta-search/button-cta-search.component';
import { ButtonHeaderAccountComponent } from '@shared/components/ui/buttons/button-header-account/button-header-account.component';
import { DrawerCartComponent } from '@shared/components/ui/drawer/drawer-cart/drawer-cart.component';
import { SearchFieldComponent } from '@shared/components/ui/form/field/search-field/search-field.component';
import { LogoComponent } from '@shared/components/ui/logo/logo.component';
import { NavComponent } from '@shared/components/ui/nav/nav.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
	selector: 'app-header-navigation',
	imports: [
		RouterModule,
		LogoComponent,
		ButtonHeaderAccountComponent,
		SearchFieldComponent,
		MenuModule,
		ButtonModule,
		ImageModule,
		NavComponent,
		ButtonCtaSearchComponent,
		DrawerCartComponent,
	],
	templateUrl: './header-navigation.component.html',
	styleUrl: './header-navigation.component.scss',
})
export class HeaderNavigationComponent implements OnInit {
	private _headerAccountLinkService: HeaderAccountLinkService = inject(HeaderAccountLinkService);
	private _authService: AuthService = inject(AuthService);
	private _router: Router = inject(Router);

	protected headerAccountLinks!: Signal<HeaderAccountLink[]>;
	protected accountLinksChildren!: WritableSignal<HeaderAccountLink[]>;

	@ViewChild('accountMenu', { static: false }) public accountMenu!: Menu;

	public items: MenuItem[] | undefined;
	public isMenuOpen = false;
	private _hideMenuTimeout!: ReturnType<typeof setTimeout>;

	isDrawerCartOpen: WritableSignal<boolean> = signal<boolean>(false);

	constructor() {
		effect(() => {
			this.items = [
				{
					label: 'Account',
					items: this.accountLinksChildren(),
				},
			];
		});
	}

	ngOnInit(): void {
		this.headerAccountLinks = this._headerAccountLinkService.getHeaderAccountLinks();
		this.accountLinksChildren = this._headerAccountLinkService.getAuthAccountLinks();
	}

	public onMouseEnter(event: MouseEvent, sublabel: string): void {
		if (sublabel === 'Account') {
			clearTimeout(this._hideMenuTimeout);
			if (!this.isMenuOpen) {
				this.isMenuOpen = true;
				this.accountMenu.toggle(event);
			}
		}
	}

	public onMouseLeave(): void {
		this.hideMenuWithDelay();
	}

	public cancelHideMenu(): void {
		clearTimeout(this._hideMenuTimeout);
	}

	public hideMenuWithDelay(): void {
		this._hideMenuTimeout = setTimeout(() => {
			this.isMenuOpen = false;
			this.accountMenu.hide();
		}, 300);
	}

	public toggleAccountMenu(e: MouseEvent, sublabel: string, accountMenu: Menu): void {
		sublabel === 'Account' ? accountMenu.toggle(e) : null;
	}

	public toggleDrawerCart(): void {
		if (!this._authService.getLoggedIn()) {
			this._router.navigate(['/' + RouteEnum.AUTH_LOGIN], {
				queryParams: { returnUrl: this._router.routerState.snapshot.url },
			});
		} else {
			this.isDrawerCartOpen.update((isOpen: boolean) => !isOpen);
		}
	}
}
