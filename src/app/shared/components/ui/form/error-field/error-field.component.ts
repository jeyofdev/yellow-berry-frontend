import { Component, InputSignal, input } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { InputErrorMessagePipe } from '@shared/pipes/input-error-message.pipe';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'app-error-field',
	imports: [MessageModule, InputErrorMessagePipe],
	templateUrl: './error-field.component.html',
	styleUrl: './error-field.component.scss',
})
export class ErrorFieldComponent {
	public form: InputSignal<FormGroupDirective> = input.required<FormGroupDirective>();
	public control: InputSignal<AbstractControl | null> = input.required<AbstractControl | null>();
	public fieldName: InputSignal<string> = input.required<string>();
}
