import { Component, InputSignal, OutputEmitterRef, WritableSignal, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button-filter',
	imports: [ButtonModule],
	templateUrl: './button-filter.component.html',
	styleUrl: './button-filter.component.scss',
})
export class ButtonFilterComponent {
	public label: InputSignal<string> = input.required<string>();
	public isActive: InputSignal<boolean> = input<boolean>(false);

	public clicked: OutputEmitterRef<void> = output<void>();

	public active: WritableSignal<boolean> = signal<boolean>(false);

	public onClick(): void {
		this.active.update(oldValue => !oldValue);
		this.clicked.emit();
	}
}
