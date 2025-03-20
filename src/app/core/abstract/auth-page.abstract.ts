import { Directive, OnInit, WritableSignal, signal } from '@angular/core';
import { RouteEnum } from '@enum/route.enum';

@Directive()
export abstract class AuthPageAbstract<T> implements OnInit {
	public mainForm!: T;
	public mainFormError: WritableSignal<string> = signal<string>('');

	public routeEnum = RouteEnum;

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	public abstract onSubmit(): void;

	protected abstract initMainForm(): void;

	protected abstract initFormControls(): void;
}
