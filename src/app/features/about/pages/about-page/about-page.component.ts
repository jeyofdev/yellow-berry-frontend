import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { SuccessResponse } from '@models/response/success-response.model';
import { ServiceResponse } from '@models/service/service-response.model';
import { TeamMemberResponse } from '@models/team-member/team-member-response.model';
import { ServService } from '@services/service.service';
import { TeamMemberService } from '@services/team-member.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CardServiceComponent } from '@shared/components/ui/card/card-service/card-service.component';
import { CarouselTeamComponent } from '@shared/components/ui/carousel/carousel-team/carousel-team.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
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
	],
	templateUrl: './about-page.component.html',
	styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
	public serviceItemList: WritableSignal<ServiceResponse[]> = signal([]);
	public teamMemberItemList: WritableSignal<TeamMemberResponse[]> = signal([]);

	private _servService: ServService = inject(ServService);
	private _teamMemberService: TeamMemberService = inject(TeamMemberService);

	ngOnInit(): void {
		this._servService
			.findAll()
			.pipe(
				map((serviceResponse: SuccessResponse<ServiceResponse[]>) => {
					this.serviceItemList.set(serviceResponse.result);
				}),
			)
			.subscribe();

		this._teamMemberService
			.findAll()
			.pipe(
				map((teamMemberResponse: SuccessResponse<TeamMemberResponse[]>) => {
					this.teamMemberItemList.set(teamMemberResponse.result);
				}),
			)
			.subscribe();
	}
}
