import { FormInputAbstract } from '@abstract/form-input.abstract';
import { Component, InputSignal, forwardRef, input } from '@angular/core';
import { FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldTypeInput } from '@type/form-field-input.type';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ErrorFieldComponent } from '../error-field/error-field.component';

@Component({
	selector: 'app-text-field',
	imports: [InputTextModule, MessageModule, ErrorFieldComponent],
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

	public form: InputSignal<FormGroupDirective> = input.required<FormGroupDirective>();

	override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}
}
