import { Component, InputSignal, OnInit, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-button-header-account',
	imports: [ButtonModule, ImageModule],
	templateUrl: './button-header-account.component.html',
})
export class ButtonHeaderAccountComponent implements OnInit {
	public label: InputSignal<string> = input.required<string>();
	public sublabel: InputSignal<string> = input.required<string>();
	public imgNameFile: InputSignal<string> = input.required<string>();

	public imgSrc!: string;

	ngOnInit(): void {
		this.imgSrc = 'images/' + this.imgNameFile() + '.svg';
	}
}
