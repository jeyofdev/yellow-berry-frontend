import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
	name: 'formErrorMessage',
})
export class InputErrorMessagePipe implements PipeTransform {
	transform(control: AbstractControl | null, fieldName: string): string {
		if (!control) {
			return '';
		}

		if (control.hasError('required')) {
			return `${fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1).toLowerCase()} is required.`;
		}

		if (control.hasError('pattern') && fieldName === 'email') {
			return `The ${fieldName} is not in the correct format.`;
		}

		return '';
	}
}
