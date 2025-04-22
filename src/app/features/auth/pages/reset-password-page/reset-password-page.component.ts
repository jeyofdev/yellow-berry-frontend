import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from '@constants/regex.constant';
import { FormAuthResetPassword } from '@models/form/form-auth-reset-password.model';
import { MessageResponse } from '@models/response/message-response.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { AlertFormErrorComponent } from '@shared/components/ui/form/alert-form-error/alert-form-error.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/field/password-field/password-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';
import { LengthValidator } from '@shared/validators/length.validator';
import { PasswordMatchValidator } from '@shared/validators/password-match.validator';
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
		AlertFormErrorComponent,
	],
	templateUrl: './reset-password-page.component.html',
})
export class ResetPasswordPageComponent extends AuthPageAbstract<FormGroup<FormAuthResetPassword>> {
	public passwordCtrl!: FormControl<string>;
	public confirmPassword!: FormControl<string>;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private _router: Router = inject(Router);

	public override onSubmit(): void {
		if (this.mainForm.valid) {
			this.mainFormError.set('');

			this._authService
				.resetPassword({
					resetToken: this._activatedRoute.snapshot.queryParams['resetToken'],
					newPassword: this.mainForm.value.password as string,
				})
				.subscribe({
					next: (response: MessageResponse) => {
						console.log('reset password successful', response);
						this._router.navigateByUrl('/auth/reset-password/confirm');
					},
					error: err => {
						this.mainFormError = err.error.message;
					},
				});
		} else {
			this.mainFormError.set('The form contains errors. Please verify yours informations and try again.');
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group(
			{
				password: this.passwordCtrl,
				confirmPassword: this.confirmPassword,
			},
			{
				validators: [PasswordMatchValidator('password', 'confirmPassword')],
			},
		);
	}

	protected override initFormControls(): void {
		this.passwordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(8, 16), Validators.pattern(Regex.PASSWORD_PATTERN)],
			nonNullable: true,
		});

		this.confirmPassword = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(8, 16), Validators.pattern(Regex.PASSWORD_PATTERN)],
			nonNullable: true,
		});
	}
}
