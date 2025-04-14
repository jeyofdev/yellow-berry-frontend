import { Location } from '@angular/common';
import { Component, InputSignal, booleanAttribute, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { ButtonCtaLargeComponent } from '@shared/components/ui/buttons/button-cta-large/button-cta-large.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-not-found',
	imports: [RouterModule, ImageModule, ButtonCtaLargeComponent],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
	private _location: Location = inject(Location);

	public title: InputSignal<string> = input.required<string>();
	public content: InputSignal<string> = input.required<string>();
	public imgSrc: InputSignal<string> = input.required<string>();
	public imgAlt: InputSignal<string> = input.required<string>();
	public primaryLink: InputSignal<RouteEnum> = input.required<RouteEnum>();
	public labelPrimaryLink: InputSignal<string> = input.required<string>();
	public showBtnGoBack = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	goBack(): void {
		this._location.back();
	}
}
