import { Component, InputSignal, booleanAttribute, input } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
	selector: 'app-panel-toggle',
	imports: [PanelModule],
	templateUrl: './panel-toggle.component.html',
	styleUrl: './panel-toggle.component.scss',
})
export class PanelToggleComponent {
	public header: InputSignal<string> = input.required<string>();
	public content: InputSignal<string> = input.required<string>();
	public collapsed: InputSignal<boolean> = input<boolean>(false);
}
