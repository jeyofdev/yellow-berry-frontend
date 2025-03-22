import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { ProductResponse } from '@models/product/product-response.model';
import { PriceComponent } from '@shared/components/ui/price/price.component';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-card-product',
	imports: [CommonModule, RouterModule, ImageModule, PriceComponent, RatingComponent],
	templateUrl: './card-product.component.html',
	styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
	public product: InputSignal<ProductResponse> = input.required<ProductResponse>();
	public layout: InputSignal<'list' | 'grid'> = input<'list' | 'grid'>('grid');

	public routeEnum = RouteEnum;
}
