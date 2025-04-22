import { Component, InputSignal, OnInit, input } from '@angular/core';
import { BrandResponse } from '@models/brand/brand-response.model';
import { pluralizeText } from '@utils/text.utils';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-brand',
	imports: [CarouselModule, ImageModule],
	templateUrl: './carousel-brand.component.html',
	styleUrl: './carousel-brand.component.scss',
})
export class CarouselBrandComponent implements OnInit {
	public items: InputSignal<BrandResponse[]> = input.required<BrandResponse[]>();

	public responsiveOptions!: CarouselResponsiveOptions[];

	ngOnInit() {
		this.responsiveOptions = [
			{
				breakpoint: '1400px',
				numVisible: 6,
				numScroll: 1,
			},
			{
				breakpoint: '1280px',
				numVisible: 5,
				numScroll: 1,
			},
			{
				breakpoint: '1100px',
				numVisible: 4,
				numScroll: 1,
			},
			{
				breakpoint: '960px',
				numVisible: 3,
				numScroll: 1,
			},
			{
				breakpoint: '768px',
				numVisible: 2,
				numScroll: 1,
			},
			{
				breakpoint: '400px',
				numVisible: 1,
				numScroll: 1,
			},
		];
	}

	public formatProductCountText(size: number): string {
		return pluralizeText(size, 'item');
	}
}
