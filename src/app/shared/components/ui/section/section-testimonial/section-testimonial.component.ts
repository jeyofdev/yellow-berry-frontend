import { Component, InputSignal, input } from '@angular/core';
import { TestimonialResponse } from '@models/testimonial/testimonial-response.model';
import { CarouselTestimonialComponent } from '@shared/components/ui/carousel/carousel-testimonial/carousel-testimonial.component';

@Component({
	selector: 'app-section-testimonial',
	imports: [CarouselTestimonialComponent],
	templateUrl: './section-testimonial.component.html',
	styleUrl: './section-testimonial.component.scss',
})
export class SectionTestimonialComponent {
	public testimonialItemList: InputSignal<TestimonialResponse[]> = input.required<TestimonialResponse[]>();
}
