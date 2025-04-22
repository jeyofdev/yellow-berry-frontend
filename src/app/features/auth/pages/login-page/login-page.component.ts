import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regex } from '@constants/regex.constant';
import { RouteEnum } from '@enum/route.enum';
import { LoginResponse } from '@models/auth/login-response.model';
import { FormAuthLogin } from '@models/form/form-auth-login.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { AlertFormErrorComponent } from '@shared/components/ui/form/alert-form-error/alert-form-error.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/field/password-field/password-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/field/text-field/text-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkFormComponent } from '@shared/components/ui/link/link-form/link-form.component';
import { LengthValidator } from '@shared/validators/length.validator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-login',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		HeaderComponent,
		BreadcrumbComponent,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		TextFieldComponent,
		PasswordFieldComponent,
		ButtonFormComponent,
		LinkFormComponent,
		LayoutAuthContentComponent,
		AlertFormErrorComponent,
	],
	templateUrl: './login-page.component.html',
})
export class LoginPageComponent extends AuthPageAbstract<FormGroup<FormAuthLogin>> {
	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);
	private _activatedRouteService: ActivatedRoute = inject(ActivatedRoute);
	private _routerService: Router = inject(Router);

	public emailCtrl!: FormControl<string>;
	public passwordCtrl!: FormControl<string>;

	public loginResponse = signal<LoginResponse | null>(null);

	public override onSubmit(): void {
		if (this.mainForm.valid) {
			this.mainFormError.set('');

			this._authService
				.login({
					email: this.mainForm.value.email as string,
					password: this.mainForm.value.password as string,
				})
				.subscribe({
					next: () => {
						const returnUrl = this._activatedRouteService.snapshot.queryParams['returnUrl'];
						this._routerService.navigateByUrl(returnUrl);
					},
					error: err => {
						this.mainFormError = err.error.message;
					},
				});
		} else {
			this.mainFormError.set('Register failed. Please verify yours informations and try again.');
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	protected override initFormControls(): void {
		this.emailCtrl = this._formBuilder.control<string>('', {
			validators: [Validators.required, Validators.pattern(Regex.EMAIL_PATTERN)],
			nonNullable: true,
		});

		this.passwordCtrl = this._formBuilder.control<string>('', {
			validators: [Validators.required, LengthValidator(8, 16), Validators.pattern(Regex.PASSWORD_PATTERN)],
			nonNullable: true,
		});
	}
}
