import { Component, InputSignal, OutputEmitterRef, effect, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
	selector: 'app-number-step-field',
	imports: [InputNumberModule, FormsModule],
	templateUrl: './number-step-field.component.html',
	styleUrl: './number-step-field.component.scss',
})
export class NumberStepFieldComponent {
	public _value: InputSignal<number> = input.required<number>({ alias: 'value' });
	public value!: number;

	constructor() {
		effect(() => (this.value = this._value()));
	}
}
