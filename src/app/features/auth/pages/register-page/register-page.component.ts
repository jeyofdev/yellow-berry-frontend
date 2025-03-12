import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleEnum } from '@enum/role-enum.enum';
import { FormAuthRegisterAddress } from '@models/form/form-auth-register-address.model';
import { FormAuthRegisterContact } from '@models/form/form-auth-register-contact.model';
import { FormAuthRegisterInfo } from '@models/form/form-auth-register-info.model';
import { FormAuthRegisterPassword } from '@models/form/form-auth-register-password.model';
import { FormAuthRegister } from '@models/form/form-auth-register.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { MaskFieldComponent } from '@shared/components/ui/form/mask-field/mask-field.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/password-field/password-field.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthFormComponent } from '@shared/components/ui/layout/layout-auth-form/layout-auth-form.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { LinkFormComponent } from '@shared/components/ui/link/link-form/link-form.component';

@Component({
	selector: 'app-register',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		LayoutBaseComponent,
		HeaderTopbarComponent,
		HeaderNavigationComponent,
		HeaderPrimaryNavigationComponent,
		SearchFieldComponent,
		BreadcrumbComponent,
		LayoutAuthFormComponent,
		ButtonFormComponent,
		LinkFormComponent,
		TextFieldComponent,
		MaskFieldComponent,
		PasswordFieldComponent,
	],
	templateUrl: './register-page.component.html',
	styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
	public mainForm!: FormGroup<FormAuthRegister>;
	public userInfoGroup!: FormGroup<FormAuthRegisterInfo>;
	public userContactGroup!: FormGroup<FormAuthRegisterContact>;
	public userAddressGroup!: FormGroup<FormAuthRegisterAddress>;
	public userPasswordGroup!: FormGroup<FormAuthRegisterPassword>;

	public firstnameCtrl!: FormControl<string | null>;
	public lastnameCtrl!: FormControl<string | null>;
	public emailCtrl!: FormControl<string | null>;
	public phoneCtrl!: FormControl<string | null>;
	public addressCtrl!: FormControl<string | null>;
	public regionCtrl!: FormControl<string | null>;
	public departmentCtrl!: FormControl<string | null>;
	public zipCodeCtrl!: FormControl<string | null>;
	public cityCtrl!: FormControl<string | null>;
	public passwordCtrl!: FormControl<string | null>;
	public confirmPasswordCtrl!: FormControl<string | null>;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		console.log('register datas : ', this.mainForm.value);
		this._authService
			.register({
				email: this.mainForm.value.contact?.email ?? '',
				password: this.mainForm.value.password?.password ?? '',
				role: RoleEnum.USER,
			})
			.subscribe({
				next: response => {
					console.log('Register successful', response);
				},
				error: err => {
					console.error('Error during register', err);
				},
			});
	}

	private initMainForm() {
		this.mainForm = this._formBuilder.group({
			info: this.userInfoGroup,
			contact: this.userContactGroup,
			address: this.userAddressGroup,
			password: this.userPasswordGroup,
		});
	}

	private initFormControls(): void {
		this.firstnameCtrl = this._formBuilder.control('');
		this.lastnameCtrl = this._formBuilder.control('');
		this.emailCtrl = this._formBuilder.control('');
		this.phoneCtrl = this._formBuilder.control('');
		this.addressCtrl = this._formBuilder.control('');
		this.regionCtrl = this._formBuilder.control('');
		this.departmentCtrl = this._formBuilder.control('');
		this.cityCtrl = this._formBuilder.control('');
		this.zipCodeCtrl = this._formBuilder.control('');
		this.passwordCtrl = this._formBuilder.control('');
		this.confirmPasswordCtrl = this._formBuilder.control('');

		this.userInfoGroup = this._formBuilder.group({
			firstname: this.firstnameCtrl,
			lastname: this.lastnameCtrl,
		});

		this.userContactGroup = this._formBuilder.group({
			email: this.emailCtrl,
			phone: this.phoneCtrl,
		});

		this.userAddressGroup = this._formBuilder.group({
			address: this.addressCtrl,
			region: this.regionCtrl,
			department: this.departmentCtrl,
			zipCode: this.zipCodeCtrl,
			city: this.cityCtrl,
		});

		this.userPasswordGroup = this._formBuilder.group({
			password: this.passwordCtrl,
			confirmPassword: this.confirmPasswordCtrl,
		});
	}
}
