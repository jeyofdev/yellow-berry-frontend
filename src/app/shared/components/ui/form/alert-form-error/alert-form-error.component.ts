import { Component, InputSignal, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'app-alert-form-error',
	imports: [MessageModule],
	templateUrl: './alert-form-error.component.html',
	styleUrl: './alert-form-error.component.scss',
})
export class AlertFormErrorComponent {
	public message: InputSignal<string> = input.required<string>();
}
