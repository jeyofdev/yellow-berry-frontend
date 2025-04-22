import { FormInputAbstract } from '@abstract/form-input/form-input.abstract';
import { Component, InputSignal, OutputEmitterRef, forwardRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SliderSlideEndEvent } from 'primeng/slider';
import { SliderModule } from 'primeng/slider';
@Component({
	selector: 'app-slider-field',
	imports: [FormsModule, ReactiveFormsModule, SliderModule, InputTextModule],
	templateUrl: './slider-field.component.html',
	styleUrl: './slider-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SliderFieldComponent),
			multi: true,
		},
	],
})
export class SliderFieldComponent extends FormInputAbstract<number[], SliderSlideEndEvent> {
	public min: InputSignal<number> = input<number>(0);
	public max: InputSignal<number> = input<number>(100);
	public range: InputSignal<boolean> = input<boolean>(false);

	public changed: OutputEmitterRef<void> = output();

	public override onInputChange(event: SliderSlideEndEvent): void {
		if (this.disabled) {
			return;
		}

		this.value = event.values as number[];

		this.onChanged(this.value);
		this.onTouched();
		this.changed.emit();
	}

	get formattedValue(): string {
		if (!this.value || this.value.length !== 2) {
			return '';
		}
		return `${this.value[0]} - ${this.value[1]}`;
	}
}
