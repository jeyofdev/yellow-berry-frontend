import { FormControlAbstract } from '@abstract/form-input/form-control.abstract';
import { Directive, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class ControlValueAccessorAbstract<T, E>
	extends FormControlAbstract
	implements OnInit, ControlValueAccessor
{
	public value!: T;
	public disabled!: boolean;

	protected onChanged!: (value: T) => void;
	protected onTouched!: () => void;

	public ngOnInit(): void {
		this.disabled = false;
	}

	public abstract onInputChange(event: E): void;

	public writeValue(value: T): void {
		this.value = value;
	}

	public registerOnChange(fn: (value: T) => void): void {
		this.onChanged = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public markAsTouched(): void {
		this.onTouched();
	}
}
