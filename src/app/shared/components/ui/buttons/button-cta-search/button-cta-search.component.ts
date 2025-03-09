import { Component, InputSignal, OnInit, booleanAttribute, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';

@Component({
	selector: 'app-button-cta-search',
	imports: [ButtonModule, ImageModule, MenuModule],
	templateUrl: './button-cta-search.component.html',
})
export class ButtonCtaSearchComponent implements OnInit {
	public hasNoPadding = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	public width: InputSignal<string> = input<string>('20');
	public height: InputSignal<string> = input<string>('20');

	public styleClass!: string;

	ngOnInit(): void {
		this.styleClass = `btn bg-transparent border-gray-200 rounded-[0.625rem] w-auto ${this.hasNoPadding() ? 'p-0 border-none' : 'p-2.5'}`;
	}
}
