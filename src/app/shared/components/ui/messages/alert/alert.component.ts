import { Component, InputSignal, input } from '@angular/core';
import { MessageSeverityTypeInput } from '@type/message-input.type';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'app-alert',
	imports: [MessageModule],
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.scss',
})
export class AlertComponent {
	public content: InputSignal<string> = input.required<string>();
	public severity: InputSignal<MessageSeverityTypeInput> = input.required<MessageSeverityTypeInput>();
}
