import { CommonModule } from '@angular/common';
import { Component, InputSignal, OnInit, OutputEmitterRef, input, output } from '@angular/core';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-card-product-cart',
	imports: [CommonModule, ImageModule, ButtonIconSmallComponent],
	templateUrl: './card-product-cart.component.html',
	styleUrl: './card-product-cart.component.scss',
})
export class CardProductCartComponent implements OnInit {
	public product: InputSignal<ProductToCartResponse> = input.required<ProductToCartResponse>();

	sendProductIdToParent: OutputEmitterRef<string> = output<string>();

	public productNb!: number;

	ngOnInit(): void {
		if (this.product()) {
			this.productNb = this.product().quantity;
		}
	}

	public onDelete(): void {
		this.sendProductIdToParent.emit(this.product().id);
	}
}
