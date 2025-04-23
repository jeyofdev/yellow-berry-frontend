import { Component, InputSignal, OnInit, input } from '@angular/core';
import { ProductResponse } from '@models/product/product-response.model';
import { TeamMemberResponse } from '@models/team-member/team-member-response.model';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CardProductComponent } from '../../card/card-product/card-product.component';

@Component({
	selector: 'app-carousel-product',
	imports: [CarouselModule, ImageModule, CardProductComponent],
	templateUrl: './carousel-product.component.html',
	styleUrl: './carousel-product.component.scss',
})
export class CarouselProductComponent implements OnInit {
	public items: InputSignal<ProductResponse[]> = input.required<ProductResponse[]>();
	public isShowCloseBtn: InputSignal<boolean> = input<boolean>(false);

	public responsiveOptions!: CarouselResponsiveOptions[];

	ngOnInit() {
		this.responsiveOptions = [
			{
				breakpoint: '1400px',
				numVisible: 4,
				numScroll: 1,
			},
			{
				breakpoint: '1199px',
				numVisible: 3,
				numScroll: 1,
			},
			{
				breakpoint: '767px',
				numVisible: 2,
				numScroll: 1,
			},
			{
				breakpoint: '575px',
				numVisible: 1,
				numScroll: 1,
			},
		];
	}
}
