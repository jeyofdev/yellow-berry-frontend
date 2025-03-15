import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const LengthValidator = (min: number, max: number): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value as string;

		if (value.length < min || value.length > max) {
			return { length: true };
		}

		return null;
	};
};
