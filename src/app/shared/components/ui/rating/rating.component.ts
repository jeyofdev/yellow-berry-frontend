import { Component, InputSignal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
	selector: 'app-rating',
	imports: [FormsModule, RatingModule],
	templateUrl: './rating.component.html',
	styleUrl: './rating.component.scss',
})
export class RatingComponent {
	public rating: InputSignal<number> = input.required<number>();
}
