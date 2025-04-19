import { Component, InputSignal, booleanAttribute, input } from '@angular/core';
import { DividerComponent } from '../../divider/divider.component';

@Component({
	selector: 'app-filter-box',
	imports: [DividerComponent],
	templateUrl: './filter-box.component.html',
	styleUrl: './filter-box.component.scss',
})
export class FilterBoxComponent {
	public title: InputSignal<string> = input.required<string>();
	public hasDivider = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
}
