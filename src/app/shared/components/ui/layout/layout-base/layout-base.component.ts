import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-layout-base',
	imports: [CommonModule],
	templateUrl: './layout-base.component.html',
})
export class LayoutBaseComponent {
	public justifyContent: InputSignal<string> = input.required<string>();
	public alignItems: InputSignal<string> = input<string>('items-start');
	public flexDirection: InputSignal<string> = input<string>('flex-row');
	public gap: InputSignal<string> = input<string>('gap-0');
}
