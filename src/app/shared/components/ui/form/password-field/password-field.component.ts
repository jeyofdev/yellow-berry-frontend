import { FormInputAbstract } from '@abstract/form-input.abstract';
import { Component, InputSignal, booleanAttribute, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorFieldComponent } from '@shared/components/ui/form/error-field/error-field.component';
import { PasswordModule } from 'primeng/password';

@Component({
	selector: 'app-password-field',
	imports: [PasswordModule, ErrorFieldComponent],
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
export class PasswordFieldComponent extends FormInputAbstract<string> {
	public placeholder: InputSignal<string> = input<string>('');
	public feedback = input<boolean, unknown>(false, { transform: booleanAttribute });
	public toggleMask = input<boolean, unknown>(false, { transform: booleanAttribute });
	public min: InputSignal<number> = input.required<number>();
	public max: InputSignal<number> = input.required<number>();

	public override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;
		this.onChanged(this.value);
	}
}
