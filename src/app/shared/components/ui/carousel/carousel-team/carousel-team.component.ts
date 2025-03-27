import { Component, InputSignal, OnInit, input } from '@angular/core';
import { TeamMemberResponse } from '@models/team-member/team-member-response.model';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-carousel-team',
	imports: [CarouselModule, ImageModule],
	templateUrl: './carousel-team.component.html',
	styleUrl: './carousel-team.component.scss',
})
export class CarouselTeamComponent implements OnInit {
	public items: InputSignal<TeamMemberResponse[]> = input.required<TeamMemberResponse[]>();

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
