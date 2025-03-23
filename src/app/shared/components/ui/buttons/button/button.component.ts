import { Component, InputSignal, booleanAttribute, input } from '@angular/core';
import { ButtonSeverityTypeInput, ButtonVariantTypeInput } from '@type/button-input.type';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button',
	imports: [ButtonModule],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class ButtonComponent {
	public label: InputSignal<string> = input<string>('');
	public icon: InputSignal<string> = input<string>('');
	public variant: InputSignal<ButtonVariantTypeInput> = input<ButtonVariantTypeInput>();
	public severity: InputSignal<ButtonSeverityTypeInput> = input.required<ButtonSeverityTypeInput>();
	public isRounded = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	public isOutlined = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
}
