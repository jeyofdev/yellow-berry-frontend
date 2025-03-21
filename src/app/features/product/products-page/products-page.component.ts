import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';

@Component({
	selector: 'app-products-page',
	imports: [HeaderComponent, BreadcrumbComponent],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {}
