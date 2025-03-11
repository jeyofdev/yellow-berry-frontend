import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAuthLogin } from '@models/form/form-auth-login.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/password-field/password-field.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthFormComponent } from '@shared/components/ui/layout/layout-auth-form/layout-auth-form.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { LinkFormComponent } from '@shared/components/ui/link/link-form/link-form.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-login',
	imports: [
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
		BreadcrumbComponent,
		InputTextModule,
		FormsModule,
		ReactiveFormsModule,
		PasswordModule,
		ButtonModule,
		TextFieldComponent,
		PasswordFieldComponent,
		ButtonFormComponent,
		LinkFormComponent,
		LayoutAuthFormComponent,
	],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthLogin>;

	public emailCtrl!: FormControl<string | null>;
	public passwordCtrl!: FormControl<string | null>;

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
	) {}

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
