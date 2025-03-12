import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAuthForgotPassword } from '@models/form/form-auth-forgot-password.model';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonBackComponent } from '@shared/components/ui/buttons/button-back/button-back.component';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { SearchFieldComponent } from '@shared/components/ui/form/search-field/search-field.component';
import { TextFieldComponent } from '@shared/components/ui/form/text-field/text-field.component';
import { HeaderNavigationComponent } from '@shared/components/ui/header/header-navigation/header-navigation.component';
import { HeaderPrimaryNavigationComponent } from '@shared/components/ui/header/header-primary-navigation/header-primary-navigation.component';
import { HeaderTopbarComponent } from '@shared/components/ui/header/header-topbar/header-topbar.component';
import { LayoutAuthFormComponent } from '@shared/components/ui/layout/layout-auth-form/layout-auth-form.component';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';

@Component({
	selector: 'app-forgot-password',
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
		TextFieldComponent,
		ButtonFormComponent,
		ButtonBackComponent,
	],
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
	public mainForm!: FormGroup<FormAuthForgotPassword>;
	public emailCtrl!: FormControl<string | null>;

	private _formBuilder: FormBuilder = inject(FormBuilder);

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	onSubmit(): void {
		console.log('forgot password form datas : ', this.mainForm.value);
	}

	private initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
		});
	}

	private initFormControls(): void {
		this.emailCtrl = this._formBuilder.control('');
	}
}
