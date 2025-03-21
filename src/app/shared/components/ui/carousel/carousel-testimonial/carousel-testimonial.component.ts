import { Component, InputSignal, input } from '@angular/core';
import { TestimonialResponse } from '@models/testimonial/testimonial-response.model';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-testimonial',
	imports: [CarouselModule, ImageModule],
	templateUrl: './carousel-testimonial.component.html',
	styleUrl: './carousel-testimonial.component.scss',
})
export class CarouselTestimonialComponent {
	items: InputSignal<TestimonialResponse[]> = input.required<TestimonialResponse[]>();
}
