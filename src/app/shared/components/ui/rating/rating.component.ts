import { CommonModule } from '@angular/common';
import { Component, InputSignal, booleanAttribute, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
	selector: 'app-rating',
	imports: [CommonModule, FormsModule, RatingModule],
	templateUrl: './rating.component.html',
	styleUrl: './rating.component.scss',
})
export class RatingComponent {
	public rating: InputSignal<number> = input.required<number>();
	public total: InputSignal<number> = input<number>(0);
	public isClickable = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
}
