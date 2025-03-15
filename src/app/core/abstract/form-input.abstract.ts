import { Directive, InputSignal, OnInit, booleanAttribute, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup } from '@angular/forms';

@Directive()
export abstract class FormInputAbstract<T> implements OnInit, ControlValueAccessor {
	public labelFor: InputSignal<string> = input.required<string>();
	public label: InputSignal<string> = input.required<string>();
	public isRequired = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	public id: InputSignal<string> = input.required<string>();
	public name: InputSignal<string> = input.required<string>();

	public parentForm: InputSignal<FormGroup> = input.required<FormGroup>();
	public groupName: InputSignal<string> = input<string>('');
	public controlName: InputSignal<string> = input.required<string>();

	public fullLabel!: string;

	public value!: T;
	public disabled!: boolean;

	protected onChanged!: (value: T) => void;
	protected onTouched!: () => void;

	public ngOnInit(): void {
		this.disabled = false;
		this.fullLabel = this.isRequired() ? `${this.label()}*` : this.label();
	}

	public abstract onInputChange(event: Event): void;

	public writeValue(value: T): void {
		this.value = value;
	}

	public registerOnChange(fn: (value: T) => void): void {
		this.onChanged = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public markAsTouched(): void {
		this.onTouched();
	}

	private getFormControl(groupName: string, parentForm: FormGroup, controlName: string) {
		if (groupName) {
			const group = parentForm.get(groupName) as FormGroup;

			return group ? group.get(controlName) : null;
		} else {
			return parentForm.get(controlName);
		}
	}

	public get control(): AbstractControl | null {
		return this.getFormControl(this.groupName() || '', this.parentForm(), this.name());
	}
}
