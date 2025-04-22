import { Directive, OnInit, WritableSignal, signal } from '@angular/core';
import { RouteEnum } from '@enum/route.enum';

@Directive()
export abstract class FormAbstract<T> implements OnInit {
	public mainForm!: T;
	public mainFormError: WritableSignal<string> = signal<string>('');

	public routeEnum = RouteEnum;

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	protected abstract initMainForm(): void;

	protected abstract initFormControls(): void;
}
