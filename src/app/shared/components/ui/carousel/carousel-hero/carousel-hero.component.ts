import { Component, InputSignal, input } from '@angular/core';
import { HeroWithTitleFormatted } from '@models/hero/hero-with-title-formated.model';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-hero',
	imports: [CarouselModule, ImageModule, ButtonCtaLargeComponent],
	templateUrl: './carousel-hero.component.html',
	styleUrl: './carousel-hero.component.scss',
})
export class CarouselHeroComponent {
	public items: InputSignal<HeroWithTitleFormatted[]> = input.required<HeroWithTitleFormatted[]>();
}
