import { HeroTitleFormatted } from './hero-title-formatted.model';

export class HeroWithTitleFormatted {
	constructor(
		public title: HeroTitleFormatted,
		public subtitle: string,
	) {}
}
