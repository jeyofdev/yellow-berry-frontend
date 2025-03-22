import { CommonModule } from '@angular/common';
import { Component, InputSignal, WritableSignal, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductResponse } from '@models/product/product-response.model';
import { CardProductComponent } from '@shared/components/ui/card/card-product/card-product.component';
import { LayoutTypeInput } from '@type/list-product-input.type';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { SelectButton } from 'primeng/selectbutton';

@Component({
	selector: 'app-list-product',
	imports: [CommonModule, FormsModule, DataViewModule, SelectButton, CardModule, RatingModule, CardProductComponent],
	templateUrl: './list-product.component.html',
	styleUrl: './list-product.component.scss',
})
export class ListProductComponent {
	productItemList: InputSignal<ProductResponse[]> = input.required<ProductResponse[]>();

	layout: WritableSignal<LayoutTypeInput> = signal<LayoutTypeInput>('grid');
	options = ['grid', 'list'];
}
