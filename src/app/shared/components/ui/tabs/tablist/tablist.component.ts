import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { TablistTitlePositionInput } from '@type/tab-input.type';
import { TabsModule } from 'primeng/tabs';

@Component({
	selector: 'app-tablist',
	imports: [CommonModule, TabsModule],
	templateUrl: './tablist.component.html',
	styleUrl: './tablist.component.scss',
})
export class TablistComponent {
	public titleList: InputSignal<TablistTitlePositionInput[]> = input.required<TablistTitlePositionInput[]>();
}
