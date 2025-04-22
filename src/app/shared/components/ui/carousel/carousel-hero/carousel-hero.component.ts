import { Component, InputSignal, OnInit, input } from '@angular/core';
import { HeroWithTitleFormatted } from '@models/hero/hero-with-title-formated.model';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-hero',
	imports: [CarouselModule, ImageModule, ButtonCtaLargeComponent],
	templateUrl: './carousel-hero.component.html',
	styleUrl: './carousel-hero.component.scss',
})
export class CarouselHeroComponent implements OnInit {
	public items: InputSignal<HeroWithTitleFormatted[]> = input.required<HeroWithTitleFormatted[]>();

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
