import { FormInputAbstract } from '@abstract/form-input.abstract';
import { Component, InputSignal, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldTypeInput } from '@type/form-field-input.type';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'app-text-field',
	imports: [InputTextModule],
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
export class TextFieldComponent extends FormInputAbstract<string> {
	public type: InputSignal<TextFieldTypeInput> = input<TextFieldTypeInput>('text');
	public placeholder: InputSignal<string> = input<string>('');

	override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}
}
