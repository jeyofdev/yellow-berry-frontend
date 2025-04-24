import { Component, InputSignal, input } from '@angular/core';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-banner-small',
	imports: [ButtonCtaLargeComponent, ImageModule],
	templateUrl: './banner-small.component.html',
	styleUrl: './banner-small.component.scss',
})
export class BannerSmallComponent {
	public title: InputSignal<string> = input.required<string>();
	public subtitle: InputSignal<string> = input.required<string>();
	public imgSrc: InputSignal<string> = input.required<string>();
	public altSrc: InputSignal<string> = input.required<string>();
	public variantColor: InputSignal<string> = input.required<string>();
}
