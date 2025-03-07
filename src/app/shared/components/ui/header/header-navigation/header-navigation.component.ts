import { Component } from '@angular/core';
import { LogoComponent } from '@shared/components/ui/logo/logo.component';

@Component({
	selector: 'app-header-navigation',
	imports: [LogoComponent],
	templateUrl: './header-navigation.component.html',
	styleUrl: './header-navigation.component.scss',
})
export class HeaderNavigationComponent {}
