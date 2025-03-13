import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-confirm-reset-password-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutAuthContentComponent, ButtonModule],
	templateUrl: './confirm-reset-password-page.component.html',
	styleUrl: './confirm-reset-password-page.component.scss',
})
export class ConfirmResetPasswordPageComponent {
	private _router: Router = inject(Router);

	onClick(): void {
		this._router.navigateByUrl('/auth/login');
	}
}
