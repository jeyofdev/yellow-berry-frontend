import { CommonModule } from '@angular/common';
import { Component, InputSignal, OnInit, input } from '@angular/core';

@Component({
	selector: 'app-layout',
	imports: [CommonModule],
	templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
	public justifyContent: InputSignal<string> = input.required<string>();
	public alignItems: InputSignal<string> = input<string>('items-start');

	public styleClass =
		'flex max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl mx-auto px-6 w-full';

	ngOnInit() {
		this.styleClass += ` ${this.justifyContent()} ${this.alignItems()}`;
	}
}
