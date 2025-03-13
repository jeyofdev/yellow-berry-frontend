import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-confirm-reset-password-page',
	imports: [
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
		BreadcrumbComponent,
		LayoutAuthContentComponent,
		ButtonModule,
	],
	templateUrl: './confirm-reset-password-page.component.html',
	styleUrl: './confirm-reset-password-page.component.scss',
})
export class ConfirmResetPasswordPageComponent {
	private _router: Router = inject(Router);

	onClick(): void {
		this._router.navigateByUrl('/auth/login');
	}
}
