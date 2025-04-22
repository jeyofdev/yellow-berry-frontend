import { FormInputAbstract } from '@abstract/form-input/form-input.abstract';
import { Component, InputSignal, forwardRef, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-step-field',
	imports: [InputNumberModule, FormsModule],
	templateUrl: './number-step-field.component.html',
	styleUrl: './number-step-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberStepFieldComponent),
			multi: true,
		},
	],
})
export class NumberStepFieldComponent extends FormInputAbstract<number, InputNumberInputEvent> {
	public override onInputChange(event: InputNumberInputEvent): void {
		if (this.disabled) {
			return;
		}

		this.value = event.value as number;

		this.onChanged(this.value);
	}
}
