import { CommonModule } from '@angular/common';
import { Component, InputSignal, OnInit, input } from '@angular/core';
import { LogoTextPositionInput } from '@type/logo-input.type';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-logo',
	imports: [CommonModule, ImageModule],
	templateUrl: './logo.component.html',
	styleUrl: './logo.component.scss',
})
export class LogoComponent {
	public textPosition: InputSignal<LogoTextPositionInput> = input.required<LogoTextPositionInput>();
}
