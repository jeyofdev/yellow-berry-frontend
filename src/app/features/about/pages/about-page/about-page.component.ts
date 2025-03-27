import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SuccessResponse } from '@models/response/success-response.model';
import { ServiceResponse } from '@models/service/service-response.model';
import { TeamMemberResponse } from '@models/team-member/team-member-response.model';
import { TestimonialResponse } from '@models/testimonial/testimonial-response.model';
import { ServService } from '@services/service.service';
import { TeamMemberService } from '@services/team-member.service';
import { TestimonialService } from '@services/testimonial.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CardServiceComponent } from '@shared/components/ui/card/card-service/card-service.component';
import { CarouselTeamComponent } from '@shared/components/ui/carousel/carousel-team/carousel-team.component';
import { CarouselTestimonialComponent } from '@shared/components/ui/carousel/carousel-testimonial/carousel-testimonial.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { SectionSubtitleComponent } from '@shared/components/ui/section/section-subtitle/section-subtitle.component';
import { SectionTitleComponent } from '@shared/components/ui/section/section-title/section-title.component';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

@Component({
	selector: 'app-about-page',
	imports: [
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		ImageModule,
		CardServiceComponent,
		CarouselTeamComponent,
		CarouselTestimonialComponent,
		SectionTitleComponent,
		SectionSubtitleComponent,
	],
	templateUrl: './about-page.component.html',
	styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {
	private _servService: ServService = inject(ServService);
	private _teamMemberService: TeamMemberService = inject(TeamMemberService);
	private _testimonialService: TestimonialService = inject(TestimonialService);

	public serviceItemList: Signal<ServiceResponse[]> = this._getServiceItemList();
	public teamMemberItemList: Signal<TeamMemberResponse[]> = this._getTeamMemberItemList();
	public testimonialItemList: Signal<TestimonialResponse[]> = this._getTestimonialItemList();

	private _getServiceItemList(): Signal<ServiceResponse[]> {
		return toSignal(
			this._servService
				.findAll()
				.pipe(map((serviceResponse: SuccessResponse<ServiceResponse[]>) => serviceResponse.result)),
			{ initialValue: [] },
		);
	}

	private _getTeamMemberItemList(): Signal<TeamMemberResponse[]> {
		return toSignal(
			this._teamMemberService
				.findAll()
				.pipe(map((teamMemberResponse: SuccessResponse<TeamMemberResponse[]>) => teamMemberResponse.result)),
			{ initialValue: [] },
		);
	}

	private _getTestimonialItemList(): Signal<TestimonialResponse[]> {
		return toSignal(
			this._testimonialService
				.findAll()
				.pipe(map((testimonialResponse: SuccessResponse<TestimonialResponse[]>) => testimonialResponse.result)),
			{ initialValue: [] },
		);
	}
}
