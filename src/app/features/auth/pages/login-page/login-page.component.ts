import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteEnum } from '@enum/route.enum';
import { FormAuthLogin } from '@models/form/form-auth-login.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/password-field/password-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkFormComponent } from '@shared/components/ui/link/link-form/link-form.component';
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
	],
	templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthLogin>;

	public emailCtrl!: FormControl<string | null>;
	public passwordCtrl!: FormControl<string | null>;

	public routeEnum = RouteEnum;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		if (this.mainForm.value.email && this.mainForm.value.password) {
			const loginRequest = {
				email: this.mainForm.value.email ?? '',
				password: this.mainForm.value.password ?? '',
			};
			this._authService.login(loginRequest).subscribe({
				next: response => {
					console.log('Login successful', response);
					console.log(this._authService.getLoggedIn() ? 'User is logged in.' : 'User is not logged in.');
				},
				error: err => {
					console.error('Error during login', err);
				},
			});
		}
	}

	private initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	private initFormControls(): void {
		this.emailCtrl = this._formBuilder.control('');
		this.passwordCtrl = this._formBuilder.control('');
	}
}
