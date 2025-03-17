import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';

@Component({
	selector: 'app-faq-page',
	imports: [HeaderComponent, LayoutContentComponent, ImageModule, PanelModule],
	templateUrl: './faq-page.component.html',
	styleUrl: './faq-page.component.scss',
})
export class FaqPageComponent {}
