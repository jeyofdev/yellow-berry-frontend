import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'app-list-cart-product',
	imports: [CommonModule, TableModule, ImageModule],
	templateUrl: './list-cart-product.component.html',
	styleUrl: './list-cart-product.component.scss',
})
export class ListCartProductComponent {
	public productList: InputSignal<ProductToCartResponse[]> = input.required<ProductToCartResponse[]>();

	public tableColumnNames = ['product', 'price', 'quantity', 'total'];
}
