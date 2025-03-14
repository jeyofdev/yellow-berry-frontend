import { Component, InputSignal, input } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'app-error-field',
	imports: [MessageModule],
	templateUrl: './error-field.component.html',
	styleUrl: './error-field.component.scss',
})
export class ErrorFieldComponent {
	public form: InputSignal<FormGroupDirective> = input.required<FormGroupDirective>();
	public control: InputSignal<AbstractControl | null> = input.required<AbstractControl | null>();
}
