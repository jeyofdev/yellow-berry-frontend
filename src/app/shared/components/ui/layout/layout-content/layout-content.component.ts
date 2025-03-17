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
}
