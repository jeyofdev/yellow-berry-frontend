import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormAuthForgotPassword } from '@models/form/form-auth-forgot-password.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';

@Component({
	selector: 'app-forgot-password-page',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
		BreadcrumbComponent,
		LayoutAuthContentComponent,
		TextFieldComponent,
		ButtonFormComponent,
		LinkBackComponent,
	],
	templateUrl: './forgot-password-page.component.html',
	styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthForgotPassword>;
	public emailCtrl!: FormControl<string | null>;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);
	private _router: Router = inject(Router);
	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		const email = this.mainForm.value.email ?? '';

		this._authService.forgotPassword(email).subscribe({
			next: response => {
				console.log('Forgot password query successful', response);
				localStorage.setItem('forgotPasswordEmail', JSON.stringify(email));
				this._router.navigateByUrl('/auth/check-email');
			},
			error: err => {
				console.error('Error during forgot password query', err);
			},
		});
	}

	private initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
		});
	}

	private initFormControls(): void {
		this.emailCtrl = this._formBuilder.control('');
	}
}
