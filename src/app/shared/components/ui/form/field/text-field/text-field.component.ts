import { FormInputWithLabelAbstract } from '@abstract/form-input/form-input-with-label.abstract';
import { Component, InputSignal, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorFieldComponent } from '@shared/components/ui/form/error-field/error-field.component';
import { TextFieldTypeInput } from '@type/form-field-input.type';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'app-text-field',
	imports: [InputTextModule, ErrorFieldComponent],
	templateUrl: './text-field.component.html',
	styleUrl: './text-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFieldComponent),
			multi: true,
		},
	],
})
export class TextFieldComponent extends FormInputWithLabelAbstract<string, Event> {
	public type: InputSignal<TextFieldTypeInput> = input<TextFieldTypeInput>('text');
	public placeholder: InputSignal<string> = input<string>('');
	public min: InputSignal<number> = input<number>(0);
	public max: InputSignal<number> = input<number>(0);

	public override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}
}
