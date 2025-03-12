import { Component, InputSignal, OnInit, booleanAttribute, forwardRef, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskFieldTypeInput } from '@type/form-field-input.type';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
	selector: 'app-mask-field',
	imports: [FormsModule, InputMaskModule],
	templateUrl: './mask-field.component.html',
	styleUrl: './mask-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MaskFieldComponent),
			multi: true,
		},
	],
})
export class MaskFieldComponent implements OnInit, ControlValueAccessor {
	public labelFor: InputSignal<string> = input.required<string>();
	public label: InputSignal<string> = input.required<string>();
	public isRequired = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	public id: InputSignal<string> = input.required<string>();
	public name: InputSignal<string> = input.required<string>();
	public type: InputSignal<MaskFieldTypeInput> = input.required<MaskFieldTypeInput>();
	public autoClear = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	public parentForm: InputSignal<FormGroup> = input.required<FormGroup>();
	public groupName: InputSignal<string> = input<string>('');
	public controlName: InputSignal<string> = input.required<string>();

	public fullLabel!: string;
	public mask!: string;
	public placeholder!: string;

	public value!: string;
	public disabled!: boolean;

	private onChanged!: (value: string) => void;
	private onTouched!: () => void;

	ngOnInit(): void {
		this.disabled = false;
		this.fullLabel = this.isRequired() ? `${this.label()}*` : this.label();

		if (this.type() === 'phone') {
			this.mask = '99-99-99-99-99';
			this.placeholder = '01-99-99-99-99';
		} else if (this.type() === 'zipCode') {
			this.mask = '99999';
			this.placeholder = '75000';
		}
	}

	onInputMaskChange(event: Event): void {
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
