import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-tab-li',
	imports: [CommonModule],
	templateUrl: './tab-li.component.html',
	styleUrl: './tab-li.component.scss',
})
export class TabLiComponent {
	public label: InputSignal<string> = input<string>('');
	public content: InputSignal<string | number> = input.required<string | number>();
	public marginBottom: InputSignal<string> = input<string>('mb-0');
}
