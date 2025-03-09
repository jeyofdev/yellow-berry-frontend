import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-layout',
	imports: [CommonModule],
	templateUrl: './layout.component.html',
})
export class LayoutComponent {
	public justifyContent: InputSignal<string> = input.required<string>();
}
