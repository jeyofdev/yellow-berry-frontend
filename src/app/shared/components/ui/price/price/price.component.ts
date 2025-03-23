import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-price',
	imports: [CommonModule],
	templateUrl: './price.component.html',
	styleUrl: './price.component.scss',
})
export class PriceComponent {
	public title: InputSignal<string> = input.required<string>();
	public value: InputSignal<number> = input.required<number>();
}
