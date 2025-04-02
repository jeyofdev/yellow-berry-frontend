import { CommonModule } from '@angular/common';
import {
	Component,
	InputSignal,
	OutputEmitterRef,
	OutputRef,
	ViewEncapsulation,
	WritableSignal,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { CartService } from '@services/cart.service';
import { NumberStepFieldComponent } from '@shared/components/ui/form/number-step-field/number-step-field.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

@Component({
	selector: 'app-drawer-cart',
	imports: [CommonModule, DrawerModule, NumberStepFieldComponent, ImageModule, DividerModule, ButtonModule],
	templateUrl: './drawer-cart.component.html',
	styleUrl: './drawer-cart.component.scss',
})
export class DrawerCartComponent {
	private _cartService: CartService = inject(CartService);

	public isVisible: InputSignal<boolean> = input<boolean>(false);

	public close: OutputEmitterRef<boolean> = output();

	public productItemList: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	public productNb: number = 1;

	constructor() {
		this._loadWishlist();
	}

	public onClose(): void {
		this.close.emit(false);
	}

	private _loadWishlist(): void {
		this._cartService
			.findByUserId()
			.pipe(
				map((cartDetailsResponse: SuccessResponse<CartDetailsResponse>) => {
					this.productItemList.set(cartDetailsResponse.result.products.results);
				}),
			)
			.subscribe();
	}
}
