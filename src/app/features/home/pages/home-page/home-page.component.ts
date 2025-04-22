import { Component, Signal, signal } from '@angular/core';
import { HeroWithTitleFormatted } from '@models/hero/hero-with-title-formated.model';
import { Hero } from '@models/hero/hero.model';
import { CarouselHeroComponent } from '@shared/components/ui/carousel/carousel-hero/carousel-hero.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';

@Component({
	selector: 'app-home-page',
	imports: [HeaderComponent, LayoutContentComponent, CarouselHeroComponent],
	templateUrl: './home-page.component.html',
})
export class HomePageComponent {
	private heroItems: Hero[] = [
		{ subtitle: 'Flat 30% Off', title: 'Explore Healthy & Fresh Fruits' },
		{ subtitle: 'Flat 20% Off', title: 'Explore Warm Fast Food & Snacks' },
		{ subtitle: 'Flat 20% Off', title: 'Explore Organic & Fresh Vegetables' },
	];

	private heroItemsFormated: HeroWithTitleFormatted[] = this.heroItems.map(item => {
		const titleArr = item.title.split(' ');

		const first = titleArr[0];
		const second = titleArr.slice(1, 2).join(' ');
		const third = titleArr.slice(2).join(' ');

		return {
			...item,
			title: {
				first,
				second,
				third,
			},
		};
	});

	public heroItemList: Signal<HeroWithTitleFormatted[]> = signal(this.heroItemsFormated);
}
