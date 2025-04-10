import { Component, InputSignal, input } from '@angular/core';
import { ButtonFormTypeInput } from '@type/button-input.type';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-cta-large',
	imports: [ButtonModule],
	templateUrl: './button-cta-large.component.html',
	styleUrl: './button-cta-large.component.scss',
})
export class ButtonCtaLargeComponent {
	public label: InputSignal<string> = input<string>('');
	public type: InputSignal<ButtonFormTypeInput> = input<ButtonFormTypeInput>('submit');
}
