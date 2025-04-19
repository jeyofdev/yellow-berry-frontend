import { FormInputAbstract } from '@abstract/form-input.abstract';
import { Component, InputSignal, OutputEmitterRef, forwardRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

@Component({
	selector: 'app-checkbox-color-field',
	imports: [CheckboxModule, FormsModule, ReactiveFormsModule],
	templateUrl: './checkbox-color-field.component.html',
	styleUrl: './checkbox-color-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxColorFieldComponent),
			multi: true,
		},
	],
})
export class CheckboxColorFieldComponent extends FormInputAbstract<string[]> {
	public override labelFor: InputSignal<string> = input<string>('');
	public override label: InputSignal<string> = input<string>('');
	public checkboxValue: InputSignal<string | number> = input.required<string | number>();
	public colorClassCss: InputSignal<string> = input.required<string>();
	public changed: OutputEmitterRef<void> = output();

	public override onInputChange(event: CheckboxChangeEvent): void {
		if (this.disabled) {
			return;
		}

		const control = this.control;
		const currentValues = Array.isArray(control?.value) ? [...control.value] : [];
		const value = this.checkboxValue();

		if (event.checked) {
			if (!currentValues.includes(value)) {
				currentValues.push(value);
			}
		} else {
			const index = currentValues.indexOf(value);
			if (index > -1) currentValues.splice(index, 1);
		}

		this.value = currentValues;
		this.onChanged(currentValues);
		control?.setValue(currentValues);

		this.changed.emit();
	}

	public isChecked(): boolean {
		return this.control?.value?.includes(this.checkboxValue()) ?? false;
	}

	public override writeValue(value: string[]): void {
		this.value = value ?? [];
	}
}
