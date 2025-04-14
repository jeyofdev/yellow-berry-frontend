import { Component, inject } from '@angular/core';
import { RouteEnum } from '@enum/route.enum';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { NotFoundComponent } from '@shared/components/ui/error/not-found/not-found.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';

@Component({
	selector: 'app-product-not-found-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, NotFoundComponent],
	templateUrl: './product-not-found-page.component.html',
	styleUrl: './product-not-found-page.component.scss',
})
export class ProductNotFoundPageComponent {
	public routeEnum = RouteEnum;
}
