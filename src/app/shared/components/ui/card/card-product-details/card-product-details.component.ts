import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ButtonComponent } from '@shared/components/ui/buttons/button/button.component';
import { NumberStepFieldComponent } from '@shared/components/ui/form/number-step-field/number-step-field.component';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-card-product-details',
	imports: [
		CommonModule,
		FormsModule,
		ImageModule,
		RatingComponent,
		ButtonModule,
		ButtonComponent,
		NumberStepFieldComponent,
	],
	templateUrl: './card-product-details.component.html',
	styleUrl: './card-product-details.component.scss',
})
export class CardProductDetailsComponent {
	product: InputSignal<ProductDetailsResponse | null> = input.required<ProductDetailsResponse | null>();

	weightValues: string[] = ['250g', '500g', '1kg', '2kg'];
	productNb: number = 1;
}
