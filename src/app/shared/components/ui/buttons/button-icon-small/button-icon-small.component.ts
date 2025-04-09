import { CommonModule } from '@angular/common';
import { Component, InputSignal, booleanAttribute, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-icon-small',
	imports: [CommonModule, ButtonModule],
	templateUrl: './button-icon-small.component.html',
	styleUrl: './button-icon-small.component.scss',
})
export class ButtonIconSmallComponent {
	public icon: InputSignal<string> = input.required<string>();
	public hasBackground = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
}
