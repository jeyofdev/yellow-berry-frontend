import { Component, InputSignal, OnInit, booleanAttribute, forwardRef, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-password-field',
	imports: [PasswordModule],
	templateUrl: './password-field.component.html',
	styleUrl: './password-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordFieldComponent),
			multi: true,
		},
	],
})
export class PasswordFieldComponent implements OnInit, ControlValueAccessor {
	public labelFor: InputSignal<string> = input.required<string>();
	public label: InputSignal<string> = input.required<string>();
	public isRequired = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	public id: InputSignal<string> = input.required<string>();
	public name: InputSignal<string> = input.required<string>();
	public placeholder: InputSignal<string> = input<string>('');
	public feedback = input<boolean, unknown>(false, { transform: booleanAttribute });
	public toggleMask = input<boolean, unknown>(false, { transform: booleanAttribute });

	public parentForm: InputSignal<FormGroup> = input.required<FormGroup>();
	public groupName: InputSignal<string> = input<string>('');
	public controlName: InputSignal<string> = input.required<string>();

	public fullLabel!: string;
	public value!: string;
	public disabled!: boolean;

	private onChanged!: (value: string) => void;
	private onTouched!: () => void;

	ngOnInit(): void {
		this.disabled = false;
		this.fullLabel = this.isRequired() ? `${this.label()}*` : this.label();
	}

	onInputPasswordChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	markAsTouched(): void {
		this.onTouched();
	}

	getFormControl(groupName: string, parentForm: FormGroup, controlName: string) {
		if (groupName) {
			const group = parentForm.get(groupName) as FormGroup;
			return group ? group.get(controlName) : null;
		} else {
			return parentForm.get(controlName);
		}
	}

	get control(): AbstractControl | null {
		return this.getFormControl(this.groupName() || '', this.parentForm(), this.name());
	}
}
