import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-check-email-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutAuthContentComponent, LinkBackComponent, ButtonModule],
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
