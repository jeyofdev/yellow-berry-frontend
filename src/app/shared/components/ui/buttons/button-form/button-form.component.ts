import { Component, InputSignal, input } from '@angular/core';
import { ButtonFormTypeInput } from '@type/button-input.type';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-form',
	imports: [ButtonModule],
	templateUrl: './button-form.component.html',
	styleUrl: './button-form.component.scss',
})
export class ButtonFormComponent {
	public type: InputSignal<ButtonFormTypeInput> = input<ButtonFormTypeInput>('submit');
	public label: InputSignal<string> = input.required<string>();
}
