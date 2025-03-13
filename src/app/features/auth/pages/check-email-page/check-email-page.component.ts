import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-check-email-page',
	imports: [
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
		BreadcrumbComponent,
		LayoutAuthContentComponent,
		LinkBackComponent,
		ButtonModule,
	],
	templateUrl: './check-email-page.component.html',
	styleUrl: './check-email-page.component.scss',
})
export class CheckEmailPageComponent implements OnInit {
	email!: string;

	private _authService = inject(AuthService);

	ngOnInit(): void {
		const savedEmail = localStorage.getItem('forgotPasswordEmail');
		if (savedEmail) {
			this.email = JSON.parse(savedEmail);
		}
	}

	onClick(): void {
		this._authService.forgotPassword(this.email).subscribe({
			next: response => {
				console.log('Forgot password query successful', response);
			},
			error: err => {
				console.error('Error during forgot password query', err);
			},
		});
	}
}
