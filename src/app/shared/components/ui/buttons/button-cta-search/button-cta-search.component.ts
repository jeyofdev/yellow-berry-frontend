import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';

@Component({
	selector: 'app-button-cta-search',
	imports: [ButtonModule, ImageModule, MenuModule],
	templateUrl: './button-cta-search.component.html',
})
export class ButtonCtaSearchComponent {}
