import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordMatchValidator = (
	passwordControlName: string,
	confirmPasswordControlName: string,
): ValidatorFn => {
	return (formGroup: AbstractControl): ValidationErrors | null => {
		const passwordCtrl = formGroup.get(passwordControlName);
		const confirmPasswordCtrl = formGroup.get(confirmPasswordControlName);

		if (!passwordCtrl || !confirmPasswordCtrl) {
			return null;
		}

		if (confirmPasswordCtrl.errors && !confirmPasswordCtrl.errors['passwordMismatch']) {
			return null;
		}

		if (passwordCtrl.value !== confirmPasswordCtrl.value) {
			confirmPasswordCtrl.setErrors({ passwordMismatch: true });
		} else {
			confirmPasswordCtrl.setErrors(null);
		}

		return null;
	};
};
