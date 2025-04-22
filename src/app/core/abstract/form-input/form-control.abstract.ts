import { Directive, InputSignal, input } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Directive()
export abstract class FormControlAbstract {
	public name: InputSignal<string> = input.required<string>();

	public parentForm: InputSignal<FormGroup> = input.required<FormGroup>();
	public groupName: InputSignal<string> = input<string>('');
	public controlName: InputSignal<string> = input.required<string>();
	public form: InputSignal<FormGroupDirective> = input.required<FormGroupDirective>();

	public get control(): AbstractControl | null {
		return this._getFormControl(this.groupName() || '', this.parentForm(), this.name());
	}

	private _getFormControl(groupName: string, parentForm: FormGroup, controlName: string) {
		if (groupName) {
			const group = parentForm.get(groupName) as FormGroup;

			return group ? group.get(controlName) : null;
		} else {
			return parentForm.get(controlName);
		}
	}
}
