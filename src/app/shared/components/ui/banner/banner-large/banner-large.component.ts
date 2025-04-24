import { Component, InputSignal, input } from '@angular/core';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';

@Component({
	selector: 'app-banner-large',
	imports: [ButtonCtaLargeComponent, LayoutContentComponent],
	templateUrl: './banner-large.component.html',
	styleUrl: './banner-large.component.scss',
})
export class BannerLargeComponent {
	public title: InputSignal<string> = input.required<string>();
	public subtitle: InputSignal<string> = input.required<string>();
}
