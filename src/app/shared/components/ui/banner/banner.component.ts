import { Component, InputSignal, input } from '@angular/core';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-banner',
	imports: [ButtonCtaLargeComponent, ImageModule],
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss',
})
export class BannerComponent {
	public title: InputSignal<string> = input.required<string>();
	public subtitle: InputSignal<string> = input.required<string>();
	public imgSrc: InputSignal<string> = input.required<string>();
	public altSrc: InputSignal<string> = input.required<string>();
	public variantColor: InputSignal<string> = input.required<string>();
}
