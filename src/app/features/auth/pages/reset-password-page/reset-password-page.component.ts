import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAuthResetPassword } from '@models/form/form-auth-reset-password.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/password-field/password-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-reset-password-page',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		HeaderComponent,
		BreadcrumbComponent,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		PasswordFieldComponent,
		ButtonFormComponent,
		LayoutAuthContentComponent,
		LinkBackComponent,
	],
	templateUrl: './reset-password-page.component.html',
	styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthResetPassword>;

	public passwordCtrl!: FormControl<string | null>;
	public confirmPassword!: FormControl<string | null>;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private _router: Router = inject(Router);

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		this._authService
			.resetPassword({
				resetToken: this._activatedRoute.snapshot.queryParams['resetToken'],
				newPassword: this.mainForm.value.password ?? '',
			})
			.subscribe({
				next: response => {
					console.log('reset password successful', response);
					this._router.navigateByUrl('/auth/reset-password/confirm');
				},
				error: err => {
					console.error('Error during reset password', err);
				},
			});
	}

	private initMainForm() {
		this.mainForm = this._formBuilder.group({
			password: this.passwordCtrl,
			confirmPassword: this.confirmPassword,
		});
	}

	private initFormControls(): void {
		this.passwordCtrl = this._formBuilder.control('');
		this.confirmPassword = this._formBuilder.control('');
	}
}
