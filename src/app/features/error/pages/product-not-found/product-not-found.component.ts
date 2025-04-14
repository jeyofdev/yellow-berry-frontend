import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-product-not-found',
	imports: [
		RouterModule,
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		ImageModule,
		ButtonCtaLargeComponent,
	],
	templateUrl: './product-not-found.component.html',
	styleUrl: './product-not-found.component.scss',
})
export class ProductNotFoundComponent {
	private _location: Location = inject(Location);

	public routeEnum = RouteEnum;

	goBack(): void {
		this._location.back();
	}
}
