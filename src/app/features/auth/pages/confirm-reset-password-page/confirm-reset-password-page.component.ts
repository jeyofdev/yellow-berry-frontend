import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonLargeComponent } from '@shared/components/ui/buttons/button-large/button-large.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';

@Component({
	selector: 'app-confirm-reset-password-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutAuthContentComponent, ButtonLargeComponent],
	templateUrl: './confirm-reset-password-page.component.html',
})
export class ConfirmResetPasswordPageComponent {
	private _router: Router = inject(Router);
	private _routeEnum = RouteEnum;

	onClick(): void {
		this._router.navigateByUrl('/' + this._routeEnum.AUTH_LOGIN);
	}
}
