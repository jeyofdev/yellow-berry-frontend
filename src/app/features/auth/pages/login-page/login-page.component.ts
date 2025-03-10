import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAuthLogin } from '@models/form/form-auth-login.model';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutComponent } from '@shared/components/ui/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-login',
	imports: [
		LayoutComponent,
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
	],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
	mainForm!: FormGroup<FormAuthLogin>;

	emailCtrl!: FormControl<string | null>;
	passwordCtrl!: FormControl<string | null>;

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		console.log('form is submit with value : ', this.mainForm.value);
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
