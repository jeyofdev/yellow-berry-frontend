import { FormAbstract } from '@abstract/form/form.abstract';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Regex } from '@constants/regex.constant';
import { FormAuthForgotPassword } from '@models/form/form-auth-forgot-password.model';
import { MessageResponse } from '@models/response/message-response.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { AlertFormErrorComponent } from '@shared/components/ui/form/alert-form-error/alert-form-error.component';
import { TextFieldComponent } from '@shared/components/ui/form/field/text-field/text-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';

@Component({
	selector: 'app-forgot-password-page',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		HeaderComponent,
		BreadcrumbComponent,
		LayoutAuthContentComponent,
		TextFieldComponent,
		ButtonFormComponent,
		LinkBackComponent,
		AlertFormErrorComponent,
	],
	templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent extends FormAbstract<FormGroup<FormAuthForgotPassword>> {
	public emailCtrl!: FormControl<string>;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);
	private _router: Router = inject(Router);

	public onSubmit(): void {
		if (this.mainForm.valid) {
			this.mainFormError.set('');

			const requestArgs = { email: this.mainForm.value.email as string };

			this._authService.forgotPassword(requestArgs).subscribe({
				next: (response: MessageResponse) => {
					console.log('Forgot password query successful', response);
					localStorage.setItem('forgotPasswordEmail', JSON.stringify(requestArgs.email));
					this._router.navigateByUrl('/auth/check-email');
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
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
		});
	}

	protected override initFormControls(): void {
		this.emailCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(Regex.EMAIL_PATTERN)],
			nonNullable: true,
		});
	}
}
