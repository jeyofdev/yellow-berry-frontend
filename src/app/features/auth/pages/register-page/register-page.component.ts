import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Regex } from '@constants/regex.constant';
import { RoleEnum } from '@enum/role.enum';
import { FormAuthRegisterAddress } from '@models/form/register/form-auth-register-address.model';
import { FormAuthRegisterContact } from '@models/form/register/form-auth-register-contact.model';
import { FormAuthRegisterInfo } from '@models/form/register/form-auth-register-info.model';
import { FormAuthRegisterPassword } from '@models/form/register/form-auth-register-password.model';
import { FormAuthRegister } from '@models/form/register/form-auth-register.model';
import { ProfileResponse } from '@models/profile/save-profile-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
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
import { PasswordMatchValidator } from '@shared/validators/password-match.validator';

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
export class RegisterPageComponent extends AuthPageAbstract<FormGroup<FormAuthRegister>> {
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

	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _authService: AuthService = inject(AuthService);

	public override ngOnInit(): void {
		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
	}

	public override onSubmit(): void {
		if (this.mainForm.valid) {
			this.mainFormError.set('');

			this._authService
				.register(
					{
						email: this.mainForm.value.userContactGroup?.email as string,
						password: this.mainForm.value.userPasswordGroup?.password as string,
						role: RoleEnum.USER,
					},
					{
						firstname: this.mainForm.value.userInfoGroup?.firstname as string,
						lastname: this.mainForm.value.userInfoGroup?.lastname as string,
						phone: `(+33) ${this.mainForm.value.userContactGroup?.phone?.slice(1).replaceAll('-', ' ')}`,
						address: this.mainForm.value.userAddressGroup?.address as string,
						zipCode: this.mainForm.value.userAddressGroup?.zipCode as string,
						city: this.mainForm.value.userAddressGroup?.city as string,
						department: this.mainForm.value.userAddressGroup?.department as string,
						region: this.mainForm.value.userAddressGroup?.region as string,
					},
				)
				.subscribe({
					next: (successResponse: SuccessResponse<ProfileResponse>) => {
						console.log('Register successful', successResponse);
					},
					error: err => {
						this.mainFormError.set(`Register failed. ${err.error.message}`);
					},
				});
		} else {
			this.mainFormError.set('Register failed. Please verify yours informations and try again.');
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			userInfoGroup: this.userInfoGroup,
			userContactGroup: this.userContactGroup,
			userAddressGroup: this.userAddressGroup,
			userPasswordGroup: this.userPasswordGroup,
		});
	}

	protected initFormGroups(): void {
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

		this.userPasswordGroup = this._formBuilder.group(
			{
				password: this.passwordCtrl,
				confirmPassword: this.confirmPasswordCtrl,
			},
			{
				validators: [PasswordMatchValidator('password', 'confirmPassword')],
			},
		);
	}

	protected override initFormControls(): void {
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
