import { FormInputAbstract } from '@abstract/form-input/form-input.abstract';
import { Component, InputSignal, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorFieldComponent } from '@shared/components/ui/form/error-field/error-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
	selector: 'app-textarea-field',
	imports: [InputTextModule, TextareaModule, ErrorFieldComponent],
	templateUrl: './textarea-field.component.html',
	styleUrl: './textarea-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaFieldComponent),
			multi: true,
		},
	],
})
export class TextareaFieldComponent extends FormInputAbstract<string, Event> {
	public placeholder: InputSignal<string> = input<string>('');
	public rows: InputSignal<number> = input.required<number>();
	public resize: InputSignal<string> = input<string>('vertical');

	public override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLTextAreaElement).value;
		this.onChanged(this.value);
	}
}
