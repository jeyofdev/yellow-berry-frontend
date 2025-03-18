import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';
import { ServService } from '@services/service.service';
import { SuccessResponse } from '@models/response/success-response.model';
import { ServiceResponse } from '@models/service/service-response.model';
import { CardServiceComponent } from '@shared/components/ui/card/card-service/card-service.component';

@Component({
	selector: 'app-about-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ImageModule, CardServiceComponent],
	templateUrl: './about-page.component.html',
	styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
	public serviceItems: WritableSignal<ServiceResponse[]> = signal([]);

	private _servService: ServService = inject(ServService);

	ngOnInit(): void {
		this._servService
			.findAll()
			.pipe(
				map((serviceResponse: SuccessResponse<ServiceResponse[]>) => {
					this.serviceItems.set(serviceResponse.result);
				}),
			)
			.subscribe();
	}
}
