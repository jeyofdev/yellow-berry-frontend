import { Component, OnInit, ViewChild, WritableSignal, inject } from '@angular/core';
import { HeaderAccountLink } from '@models/header/header-account-link.model';
import { HeaderAccountLinkService } from '@services/header/header-account-link.service';
import { ButtonCtaSearchComponent } from '@shared/components/ui/buttons/button-cta-search/button-cta-search.component';
import { ButtonHeaderAccountComponent } from '@shared/components/ui/buttons/button-header-account/button-header-account.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { LogoComponent } from '@shared/components/ui/logo/logo.component';
import { NavComponent } from '@shared/components/ui/nav/nav.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
	selector: 'app-header-navigation',
	imports: [
		LogoComponent,
		ButtonHeaderAccountComponent,
		SearchFieldComponent,
		MenuModule,
		ButtonModule,
		ImageModule,
		NavComponent,
		ButtonCtaSearchComponent,
	],
	templateUrl: './header-navigation.component.html',
	styleUrl: './header-navigation.component.scss',
})
export class HeaderNavigationComponent implements OnInit {
	protected headerAccountLinks!: WritableSignal<HeaderAccountLink[]>;
	protected accountLinksChildren!: WritableSignal<HeaderAccountLink[]>;

	@ViewChild('accountMenu', { static: false }) accountMenu!: Menu;

	items: MenuItem[] | undefined;
	isMenuOpen = false;
	private hideMenuTimeout!: ReturnType<typeof setTimeout>;

	private _headerAccountLinkService: HeaderAccountLinkService = inject(HeaderAccountLinkService);

	ngOnInit(): void {
		this.headerAccountLinks = this._headerAccountLinkService.getHeaderAccountLinks();
		this.accountLinksChildren = this._headerAccountLinkService.getNoAuthAccountLinksChildren();

		this.items = [
			{
				label: 'Account',
				items: this.accountLinksChildren(),
			},
		];
	}

	onMouseEnter(event: MouseEvent, sublabel: string): void {
		if (sublabel === 'Account') {
			clearTimeout(this.hideMenuTimeout);
			if (!this.isMenuOpen) {
				this.isMenuOpen = true;
				this.accountMenu.toggle(event);
			}
		}
	}

	onMouseLeave(): void {
		this.hideMenuWithDelay();
	}

	cancelHideMenu(): void {
		clearTimeout(this.hideMenuTimeout);
	}

	hideMenuWithDelay(): void {
		this.hideMenuTimeout = setTimeout(() => {
			this.isMenuOpen = false;
			this.accountMenu.hide();
		}, 300);
	}

	toggleAccountMenu(e: MouseEvent, sublabel: string, accountMenu: Menu): void {
		sublabel === 'Account' ? accountMenu.toggle(e) : null;
	}
}
