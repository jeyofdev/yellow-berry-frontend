import { Component, InputSignal, OnInit, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-card-service',
	imports: [CardModule, ImageModule],
	templateUrl: './card-service.component.html',
	styleUrl: './card-service.component.scss',
})
export class CardServiceComponent implements OnInit {
	public name: InputSignal<string> = input.required<string>();
	public description: InputSignal<string> = input.required<string>();
	public index: InputSignal<number> = input.required<number>();

	public imageSrc!: string;
	public imageSrcList: string[] = ['free-shipping.png', 'support.png', 'days-return.png', 'payment-secure.png'];

	ngOnInit(): void {
		this.imageSrc = `images/${this.imageSrcList[this.index()]}`;
	}
}
