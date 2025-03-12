import { Component, InputSignal, OnInit, input } from '@angular/core';
import { LayoutBaseComponent } from '../layout-base/layout-base.component';

@Component({
	selector: 'app-layout-auth-content',
	imports: [LayoutBaseComponent],
	templateUrl: './layout-auth-content.component.html',
	styleUrl: './layout-auth-content.component.scss',
})
export class LayoutAuthContentComponent implements OnInit {
	public subtitle: InputSignal<string> = input.required<string>();
	public pageTitleSecondary: InputSignal<string> = input.required<string>();
	public pageTitlePrimary: InputSignal<string> = input<string>('');
	public email: InputSignal<string> = input<string>('');
	public maxWidth: InputSignal<string> = input.required<string>();

	public containerClass!: string;

	ngOnInit(): void {
		this.containerClass = `py-8 flex flex-col justify-center items-center gap-3 w-full ${this.maxWidth()}`;
	}
}
