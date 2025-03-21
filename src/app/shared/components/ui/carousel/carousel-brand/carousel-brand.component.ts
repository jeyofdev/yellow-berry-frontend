import { Component, InputSignal, OnInit, input } from '@angular/core';
import { BrandResponse } from '@models/brand/brand-response.model';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-brand',
	imports: [CarouselModule, ImageModule],
	templateUrl: './carousel-brand.component.html',
	styleUrl: './carousel-brand.component.scss',
})
export class CarouselBrandComponent implements OnInit {
	items: InputSignal<BrandResponse[]> = input.required<BrandResponse[]>();

	responsiveOptions!: CarouselResponsiveOptions[];

	ngOnInit() {
		this.responsiveOptions = [
			{
				breakpoint: '1400px',
				numVisible: 6,
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
