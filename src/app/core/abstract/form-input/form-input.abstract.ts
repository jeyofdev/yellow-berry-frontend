import { ControlValueAccessorAbstract } from '@abstract/form-input/control-value-accessor.abstract';
import { Directive, InputSignal, booleanAttribute, input } from '@angular/core';

@Directive()
export abstract class FormInputAbstract<T, E> extends ControlValueAccessorAbstract<T, E> {
	public labelFor: InputSignal<string> = input<string>('');
	public label: InputSignal<string> = input<string>('');

	public isRequired = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	public id: InputSignal<string> = input.required<string>();

	public fullLabel!: string;

	public override ngOnInit(): void {
		super.ngOnInit();
		this.fullLabel = this.isRequired() ? `${this.label()}*` : this.label();
	}
}
