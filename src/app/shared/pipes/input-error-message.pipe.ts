import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
	name: 'inputErrorMessage',
})
export class InputErrorMessagePipe implements PipeTransform {
	transform(control: AbstractControl | null, fieldName: string, min?: number, max?: number): string {
		if (!control) {
			return '';
		}

		if (control.hasError('required')) {
			return `The ${fieldName} is required.`;
		} else if (control.hasError('length') && min !== null && max !== null) {
			return `The ${fieldName} must be contain between ${min} and  ${max} characters.`;
		} else if (control.hasError('pattern')) {
			if (fieldName === 'email') {
				return `The ${fieldName} is not in the correct format.`;
			} else if (fieldName.indexOf('password') !== -1) {
				return `The ${fieldName} must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.`;
			} else if (fieldName.indexOf('phone') !== -1) {
				return `The ${fieldName} must start with 01, 02, ..., 09 and follow the format XX-XX-XX-XX-XX.`;
			} else if (fieldName.indexOf('zipCode') !== -1) {
				return `Invalid postal code! It must be 5 digits long.`;
			} else {
				return `The ${fieldName} must contain only letters.`;
			}
		} else if (control.hasError('passwordMismatch')) {
			return `Passwords do not match! Please make sure both passwords are identical.`;
		}

		return '';
	}
}
