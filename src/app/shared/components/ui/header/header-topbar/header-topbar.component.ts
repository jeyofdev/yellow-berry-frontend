import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderTopBarLink } from '@models/header-topbar-link.model';
import { HeaderTopbarLinkService } from '@services/header-topbar-links.service';

@Component({
	selector: 'app-header-topbar',
	imports: [RouterModule],
	templateUrl: './header-topbar.component.html',
})
export class HeaderTopbarComponent implements OnInit {
	protected headerTopbarLinks!: WritableSignal<HeaderTopBarLink[]>;

	private _headerTopbarLinkService: HeaderTopbarLinkService = inject(HeaderTopbarLinkService);

	ngOnInit(): void {
		this.headerTopbarLinks = this._headerTopbarLinkService.getHeaderTopBarLinks();
	}
}
