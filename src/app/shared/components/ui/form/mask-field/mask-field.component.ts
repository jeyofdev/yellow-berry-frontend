import { FormInputAbstract } from '@abstract/form-input.abstract';
import { JsonPipe } from '@angular/common';
import { Component, InputSignal, booleanAttribute, forwardRef, input } from '@angular/core';
import { FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorFieldComponent } from '@shared/components/ui/form/error-field/error-field.component';
import { MaskFieldTypeInput } from '@type/form-field-input.type';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
	selector: 'app-mask-field',
	imports: [FormsModule, InputMaskModule, ErrorFieldComponent],
	templateUrl: './mask-field.component.html',
	styleUrl: './mask-field.component.scss',
	providers: [
		JsonPipe,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MaskFieldComponent),
			multi: true,
		},
	],
})
export class MaskFieldComponent extends FormInputAbstract<string> {
	public type: InputSignal<MaskFieldTypeInput> = input.required<MaskFieldTypeInput>();
	public autoClear = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	public mask!: string;
	public placeholder!: string;

	override ngOnInit(): void {
		super.ngOnInit();

		if (this.type() === 'phone') {
			this.mask = '99-99-99-99-99';
			this.placeholder = '01-99-99-99-99';
		} else if (this.type() === 'zipCode') {
			this.mask = '99999';
			this.placeholder = '75000';
		}
	}

	override onInputChange(event: Event): void {
		if (this.disabled) {
			return;
		}

		this.value = (event.target as HTMLInputElement).value;

		this.onChanged(this.value);
	}
}
