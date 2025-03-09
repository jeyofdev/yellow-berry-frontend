import { Component, OnInit, WritableSignal } from '@angular/core';
import { HeaderAccountLink } from '@models/header-account-link.model';
import { HeaderAccountLinkService } from '@services/header-account-link.service';
import { ButtonHeaderAccountComponent } from '@shared/components/ui/buttons/button-header-account/button-header-account.component';
import { LogoComponent } from '@shared/components/ui/logo/logo.component';

@Component({
	selector: 'app-header-navigation',
	imports: [LogoComponent, ButtonHeaderAccountComponent],
	templateUrl: './header-navigation.component.html',
	styleUrl: './header-navigation.component.scss',
})
export class HeaderNavigationComponent implements OnInit {
	protected headerAccountLinks!: WritableSignal<HeaderAccountLink[]>;

	constructor(private _headerAccountLinkService: HeaderAccountLinkService) {}

	ngOnInit(): void {
		this.headerAccountLinks =
			this._headerAccountLinkService.getHeaderAccountLinks();
	}
}
