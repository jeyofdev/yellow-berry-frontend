import { Component, InputSignal, input } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-no-result',
	imports: [ImageModule],
	templateUrl: './no-result.component.html',
	styleUrl: './no-result.component.scss',
})
export class NotResultComponent {
	public title: InputSignal<string> = input.required<string>();
	public imgSrc: InputSignal<string> = input.required<string>();
	public imgAlt: InputSignal<string> = input.required<string>();
}
