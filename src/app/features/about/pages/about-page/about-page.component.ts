import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';

@Component({
	selector: 'app-about-page',
	imports: [HeaderComponent, BreadcrumbComponent, LayoutContentComponent, ImageModule, CardModule],
	templateUrl: './about-page.component.html',
	styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {}
