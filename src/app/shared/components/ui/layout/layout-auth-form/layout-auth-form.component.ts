import { Component, InputSignal, input } from '@angular/core';
import { LayoutBaseComponent } from '../layout-base/layout-base.component';

@Component({
	selector: 'app-layout-auth-form',
	imports: [LayoutBaseComponent],
	templateUrl: './layout-auth-form.component.html',
	styleUrl: './layout-auth-form.component.scss',
})
export class LayoutAuthFormComponent {
	public subtitle: InputSignal<string> = input.required<string>();
	public pageTitleSecondary: InputSignal<string> = input.required<string>();
	public pageTitlePrimary: InputSignal<string> = input.required<string>();
}
