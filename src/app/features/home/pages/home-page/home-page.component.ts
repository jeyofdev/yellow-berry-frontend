import { Component } from '@angular/core';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutComponent } from '@shared/components/ui/layout/layout.component';

@Component({
	selector: 'app-home-page',
	imports: [LayoutComponent, HeaderTopbarComponent, HeaderNavigationComponent],
	templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
