import { Component, InputSignal, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-large',
	imports: [ButtonModule],
	templateUrl: './button-large.component.html',
	styleUrl: './button-large.component.scss',
})
export class ButtonLargeComponent {
	public label: InputSignal<string> = input.required<string>();
}
