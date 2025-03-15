import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Regex } from '@constants/regex.constant';
import { RoleEnum } from '@enum/role-enum.enum';
import { RouteEnum } from '@enum/route.enum';
import { FormAuthRegisterAddress } from '@models/form/form-auth-register-address.model';
import { FormAuthRegisterContact } from '@models/form/form-auth-register-contact.model';
import { FormAuthRegisterInfo } from '@models/form/form-auth-register-info.model';
import { FormAuthRegisterPassword } from '@models/form/form-auth-register-password.model';
import { FormAuthRegister } from '@models/form/form-auth-register.model';
import { ProfileResponse } from '@models/profile/save-profile-response.model';
import { SuccessResponse } from '@models/success-response.model';
import { AuthService } from '@services/auth/auth.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { AlertFormErrorComponent } from '@shared/components/ui/form/alert-form-error/alert-form-error.component';
import { MaskFieldComponent } from '@shared/components/ui/form/mask-field/mask-field.component';
import { PasswordFieldComponent } from '@shared/components/ui/form/password-field/password-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutAuthContentComponent } from '@shared/components/ui/layout/layout-auth-content/layout-auth-content.component';
import { LinkFormComponent } from '@shared/components/ui/link/link-form/link-form.component';
import { LengthValidator } from '@shared/validators/length.validator';

@Component({
	selector: 'app-register',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		HeaderComponent,
		BreadcrumbComponent,
		LayoutAuthContentComponent,
		ButtonFormComponent,
		LinkFormComponent,
		TextFieldComponent,
		MaskFieldComponent,
		PasswordFieldComponent,
		AlertFormErrorComponent,
	],
	templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthRegister>;
	public mainFormError!: string;
	public userInfoGroup!: FormGroup<FormAuthRegisterInfo>;
	public userContactGroup!: FormGroup<FormAuthRegisterContact>;
	public userAddressGroup!: FormGroup<FormAuthRegisterAddress>;
	public userPasswordGroup!: FormGroup<FormAuthRegisterPassword>;

	public firstnameCtrl!: FormControl<string>;
	public lastnameCtrl!: FormControl<string>;
	public emailCtrl!: FormControl<string>;
	public phoneCtrl!: FormControl<string>;
	public addressCtrl!: FormControl<string>;
	public regionCtrl!: FormControl<string>;
	public departmentCtrl!: FormControl<string>;
	public zipCodeCtrl!: FormControl<string>;
	public cityCtrl!: FormControl<string>;
	public passwordCtrl!: FormControl<string>;
	public confirmPasswordCtrl!: FormControl<string>;

	public routeEnum = RouteEnum;

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);

	ngOnInit(): void {
		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
	}

	onSubmit(): void {
		if (this.mainForm.valid) {
			this.mainFormError = '';

			// this._authService
			// 	.register(
			// 		{
			// 			email: this.mainForm.value.contact?.email ?? '',
			// 			password: this.mainForm.value.password?.password ?? '',
			// 			role: RoleEnum.USER,
			// 		},
			// 		{
			// 			firstname: this.mainForm.value.info?.firstname ?? '',
			// 			lastname: this.mainForm.value.info?.lastname ?? '',
			// 			phone: `(+33) ${this.mainForm.value.contact?.phone?.slice(1).replaceAll('-', ' ')}`,
			// 			address: this.mainForm.value.address?.address ?? '',
			// 			zipCode: this.mainForm.value.address?.zipCode ?? '',
			// 			city: this.mainForm.value.address?.city ?? '',
			// 			department: this.mainForm.value.address?.department ?? '',
			// 			region: this.mainForm.value.address?.region ?? '',
			// 		},
			// 	)
			// 	.subscribe({
			// 		next: (successResponse: SuccessResponse<ProfileResponse>) => {
			// 			console.log('Register successful', successResponse);
			// 		},
			// 		error: err => {
			// 			console.error('Error during register', err);
			// 		},
			// 	});
		} else {
			this.mainFormError = 'Login failed. Please verify your credentials and try again.';
		}
	}

	private initMainForm() {
		this.mainForm = this._formBuilder.group({
			userInfoGroup: this.userInfoGroup,
			userContactGroup: this.userContactGroup,
			userAddressGroup: this.userAddressGroup,
			userPasswordGroup: this.userPasswordGroup,
		});
	}

	private initFormGroups(): void {
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

	private initFormControls(): void {
		this.firstnameCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(3, 30), Validators.pattern(Regex.TEXT_PATTERN)],
			nonNullable: true,
		});

		this.lastnameCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(3, 80), Validators.pattern(Regex.TEXT_PATTERN)],
			nonNullable: true,
		});

		this.emailCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(Regex.EMAIL_PATTERN)],
			nonNullable: true,
		});

		this.phoneCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(Regex.PHONE_PATTERN)],
			nonNullable: true,
		});

		this.addressCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(3, 100)],
			nonNullable: true,
		});

		this.regionCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(3, 30), Validators.pattern(Regex.TEXT_PATTERN)],
			nonNullable: true,
		});

		this.departmentCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(3, 30), Validators.pattern(Regex.TEXT_PATTERN)],
			nonNullable: true,
		});

		this.cityCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(3, 30), Validators.pattern(Regex.TEXT_PATTERN)],
			nonNullable: true,
		});

		this.zipCodeCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(Regex.ZIP_CODE_PATTERN)],
			nonNullable: true,
		});

		this.passwordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(8, 16), Validators.pattern(Regex.PASSWORD_PATTERN)],
			nonNullable: true,
		});

		this.confirmPasswordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, LengthValidator(8, 16), Validators.pattern(Regex.PASSWORD_PATTERN)],
			nonNullable: true,
		});
	}
}
