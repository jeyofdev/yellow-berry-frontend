import { Component, InputSignal, input } from '@angular/core';
import { ButtonFormTypeInput, ButtonVariantTypeInput } from '@type/button-input.type';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-cta-large',
	imports: [ButtonModule],
	templateUrl: './button-cta-large.component.html',
	styleUrl: './button-cta-large.component.scss',
})
export class ButtonCtaLargeComponent {
	public label: InputSignal<string> = input<string>('');
	public icon: InputSignal<string> = input<string>('');
	public variant: InputSignal<ButtonVariantTypeInput> = input<ButtonVariantTypeInput>();
	public type: InputSignal<ButtonFormTypeInput> = input<ButtonFormTypeInput>('submit');
}
