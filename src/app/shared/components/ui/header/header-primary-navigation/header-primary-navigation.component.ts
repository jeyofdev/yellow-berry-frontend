import { Component } from '@angular/core';
import { ButtonCtaSearchComponent } from '@shared/components/ui/buttons/button-cta-search/button-cta-search.component';
import { NavComponent } from '@shared/components/ui/nav/nav.component';

@Component({
	selector: 'app-header-primary-navigation',
	imports: [NavComponent, ButtonCtaSearchComponent],
	templateUrl: './header-primary-navigation.component.html',
})
export class HeaderPrimaryNavigationComponent {}
