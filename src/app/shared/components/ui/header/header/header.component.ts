import { Component } from '@angular/core';
import { SearchFieldComponent } from '@shared/components/ui/form/field/search-field/search-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';

@Component({
	selector: 'app-header',
	imports: [
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {}
