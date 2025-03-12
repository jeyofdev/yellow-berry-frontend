import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-button-back',
	imports: [],
	templateUrl: './button-back.component.html',
	styleUrl: './button-back.component.scss',
})
export class ButtonBackComponent {
	public label: InputSignal<string> = input.required<string>();
}
