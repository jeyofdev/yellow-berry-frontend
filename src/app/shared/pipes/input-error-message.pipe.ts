import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
	name: 'formErrorMessage',
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
			}
			if (fieldName.indexOf('password') !== -1) {
				return `The ${fieldName} must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.`;
			} else {
				return `The ${fieldName} must contain only letters.`;
			}
		}
		return '';
	}
}
