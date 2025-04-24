import { Component, InputSignal, input } from '@angular/core';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';

@Component({
	selector: 'app-banner-large',
	imports: [ButtonCtaLargeComponent],
	templateUrl: './banner-large.component.html',
	styleUrl: './banner-large.component.scss',
})
export class BannerLargeComponent {
	public title: InputSignal<string> = input.required<string>();
	public subtitle: InputSignal<string> = input.required<string>();
}
