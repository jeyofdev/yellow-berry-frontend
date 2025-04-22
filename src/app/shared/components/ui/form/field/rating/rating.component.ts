import { FormInputAbstract } from '@abstract/form-input/form-input.abstract';
import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Rating, RatingRateEvent } from 'primeng/rating';

@Component({
	selector: 'app-rating',
	imports: [CommonModule, FormsModule, Rating],
	templateUrl: './rating.component.html',
	styleUrl: './rating.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RatingComponent),
			multi: true,
		},
	],
})
export class RatingComponent extends FormInputAbstract<number, RatingRateEvent> {
	public override onInputChange(event: RatingRateEvent): void {
		if (this.disabled) {
			return;
		}

		this.value = event.value;
		this.onChanged(this.value);
	}
}
