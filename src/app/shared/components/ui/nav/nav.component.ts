import { Component, OnInit, WritableSignal } from '@angular/core';
import { NavigationLink } from '@models/navigation-links.model';
import { NavigationLinksService } from '@services/navigation-links.service';
import { MenubarModule } from 'primeng/menubar';

@Component({
	selector: 'app-nav',
	imports: [MenubarModule],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
	protected navigationLinks!: WritableSignal<NavigationLink[]>;

	constructor(private _navigationLinksService: NavigationLinksService) {}

	ngOnInit(): void {
		this.navigationLinks = this._navigationLinksService.getNavigationLinks();
	}
}
