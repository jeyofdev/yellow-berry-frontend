import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAuthResetPassword } from '@models/form/form-auth-reset-password.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/password-field/password-field.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { LinkBackComponent } from '@shared/components/ui/link/link-back/link-back.component';
import { LinkFormComponent } from '@shared/components/ui/link/link-form/link-form.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-reset-password',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
		BreadcrumbComponent,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		TextFieldComponent,
		PasswordFieldComponent,
		ButtonFormComponent,
		LinkFormComponent,
		LayoutAuthContentComponent,
		LinkBackComponent,
	],
	templateUrl: './reset-password.component.html',
	styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthResetPassword>;

	public passwordCtrl!: FormControl<string | null>;
	public confirmPassword!: FormControl<string | null>;

	private _formBuilder: FormBuilder = inject(FormBuilder);

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		console.log('reset password form values : ', this.mainForm.value);
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
