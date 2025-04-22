import { FormInputAbstract } from '@abstract/form-input/form-input.abstract';
import { Directive, InputSignal, OnInit, input } from '@angular/core';

@Directive()
export abstract class FormInputWithLabelAbstract<T, E> extends FormInputAbstract<T, E> implements OnInit {
	public override labelFor: InputSignal<string> = input.required<string>();
	public override label: InputSignal<string> = input.required<string>();
}
