import { Component, InputSignal, input } from '@angular/core';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';

@Component({
	selector: 'app-layout-content',
	imports: [LayoutBaseComponent],
	templateUrl: './layout-content.component.html',
	styleUrl: './layout-content.component.scss',
})
export class LayoutContentComponent {
	public subtitle: InputSignal<string> = input<string>('');
	public pageTitleSecondary: InputSignal<string> = input<string>('');
	public pageTitlePrimary: InputSignal<string> = input<string>('');
	public pageTitleInfo: InputSignal<string> = input<string>('');
	public containerMarginTop: InputSignal<string> = input<string>('mt-0');
	public containerMarginBottom: InputSignal<string> = input<string>('mb-0');
	public childrenContainerMarginTop: InputSignal<string> = input<string>('mt-0');
	public childrenContainerMarginBottom: InputSignal<string> = input<string>('mb-0');

	public containerStyleClass!: string;
	public childrenContainerStyleClass!: string;

	ngOnInit(): void {
		this.containerStyleClass = `flex flex-col justify-center my-0 py-0 ${this.containerMarginTop()} ${this.containerMarginBottom()}`;
		this.childrenContainerStyleClass = `flex justify-center w-full ${this.childrenContainerMarginTop()} ${this.childrenContainerMarginBottom()}`;
	}
}
