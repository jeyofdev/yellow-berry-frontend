import { Component, InputSignal, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-form',
	imports: [ButtonModule],
	templateUrl: './button-form.component.html',
	styleUrl: './button-form.component.scss',
})
export class ButtonFormComponent {
	public type: InputSignal<'submit' | 'reset'> = input<'submit' | 'reset'>('submit');
	public label: InputSignal<string> = input.required<string>();
}
