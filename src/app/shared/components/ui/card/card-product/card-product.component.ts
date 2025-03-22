import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { ProductResponse } from '@models/product/product-response.model';
import { ImageModule } from 'primeng/image';
import { PriceComponent } from '../../price/price.component';
import { RatingComponent } from '../../rating/rating.component';

@Component({
	selector: 'app-card-product',
	imports: [CommonModule, ImageModule, PriceComponent, RatingComponent],
	templateUrl: './card-product.component.html',
	styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
	public product: InputSignal<ProductResponse> = input.required<ProductResponse>();
	public layout: InputSignal<'list' | 'grid'> = input<'list' | 'grid'>('grid');
}
