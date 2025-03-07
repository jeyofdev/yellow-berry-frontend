import {
	Component,
	InputSignal,
	OnInit,
	WritableSignal,
	input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderTopBarLink } from '@models/HeaderTopbarLink.model';
import { HeaderTopbarLinkService } from '@services/header-topbar-links.service';

@Component({
	selector: 'app-header-topbar',
	imports: [RouterModule],
	templateUrl: './header-topbar.component.html',
})
export class HeaderTopbarComponent implements OnInit {
	protected headerTopbarLinks!: WritableSignal<HeaderTopBarLink[]>;

	constructor(private _headerTopbarLinkService: HeaderTopbarLinkService) {}

	ngOnInit(): void {
		this.headerTopbarLinks = this._headerTopbarLinkService.getTopBarLinks();
	}
}
