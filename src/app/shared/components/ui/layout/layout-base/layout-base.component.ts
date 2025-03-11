import { CommonModule } from '@angular/common';
import { Component, InputSignal, OnInit, input } from '@angular/core';

@Component({
	selector: 'app-layout-base',
	imports: [CommonModule],
	templateUrl: './layout-base.component.html',
})
export class LayoutBaseComponent implements OnInit {
	public justifyContent: InputSignal<string> = input.required<string>();
	public alignItems: InputSignal<string> = input<string>('items-start');
	public flexDirection: InputSignal<string> = input<string>('flex-row');
	public gap: InputSignal<string> = input<string>('gap-0');

	public styleClass =
		'flex max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl mx-auto px-6 w-full';

	ngOnInit() {
		this.styleClass += ` ${this.justifyContent()} ${this.alignItems()} ${this.flexDirection()} ${this.gap()}`;
	}
}
