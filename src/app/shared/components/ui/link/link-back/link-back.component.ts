import { Component, InputSignal, input } from '@angular/core';

@Component({
	selector: 'app-link-back',
	imports: [],
	templateUrl: './link-back.component.html',
})
export class LinkBackComponent {
	public label: InputSignal<string> = input.required<string>();
}
