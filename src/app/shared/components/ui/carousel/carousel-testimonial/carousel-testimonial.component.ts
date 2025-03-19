import { Component, InputSignal, input } from '@angular/core';
import { TestimonialResponse } from '@models/testimonial/testimonial-response.model';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-testimonial',
	imports: [CarouselModule, ImageModule],
	templateUrl: './carousel-testimonial.component.html',
	styleUrl: './carousel-testimonial.component.scss',
})
export class CarouselTestimonialComponent {
	items: InputSignal<TestimonialResponse[]> = input<TestimonialResponse[]>([]);

	responsiveOptions!: CarouselResponsiveOptions[];

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
