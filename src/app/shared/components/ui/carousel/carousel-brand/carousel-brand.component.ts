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
export class CarouselBrandComponent {
	public items: InputSignal<BrandResponse[]> = input.required<BrandResponse[]>();
	public responsiveOptions: InputSignal<CarouselResponsiveOptions[]> = input.required<CarouselResponsiveOptions[]>();
	public numVisible: InputSignal<number> = input.required<number>();

	public formatProductCountText(size: number): string {
		return pluralizeText(size, 'item');
	}
}
