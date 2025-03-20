import { Component, InputSignal, OnInit, input } from '@angular/core';

@Component({
	selector: 'app-section-title',
	imports: [],
	templateUrl: './section-title.component.html',
	styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
	public secondaryContent: InputSignal<string> = input.required<string>();
	public primaryContent: InputSignal<string> = input<string>('');
	public infoContent: InputSignal<string> = input<string>('');
	public containerClass: InputSignal<string> = input<string>('text-center');
}
