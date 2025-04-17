import { Component } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
	selector: 'app-button-field',
	imports: [ToggleButtonModule],
	templateUrl: './button-field.component.html',
	styleUrl: './button-field.component.scss',
})
export class ButtonFieldComponent {}
