import { Component, InputSignal, OnInit, input } from '@angular/core';
import { ImageModule } from 'primeng/image';

type LogoTextPositionInput = 'left' | 'right';

@Component({
	selector: 'app-logo',
	imports: [ImageModule],
	templateUrl: './logo.component.html',
	styleUrl: './logo.component.scss',
})
export class LogoComponent implements OnInit {
	public textPosition: InputSignal<LogoTextPositionInput> = input.required<LogoTextPositionInput>();

	protected textOrderClassname!: string;
	protected imgOrderClassname!: string;

	ngOnInit(): void {
		this.textOrderClassname = this.textPosition() === 'left' ? 'order-1' : 'order-2';

		this.imgOrderClassname = this.textPosition() === 'left' ? 'order-2' : 'order-1';
	}
}
