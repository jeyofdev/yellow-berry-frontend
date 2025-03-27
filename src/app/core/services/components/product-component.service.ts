import { Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { ProductService } from '@services/product.service';
import { Subscription, map } from 'rxjs';
import { WishlistComponentService } from './wishlist-component.service';

@Injectable({
	providedIn: 'root',
})
export class ProductComponentService {
	private _productService: ProductService = inject(ProductService);
	private _wishlistComponentService: WishlistComponentService = inject(WishlistComponentService);

	private _productListInWishlist: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);
	private _productSubscription: Subscription | null = null;

	addOrRemoveProductToWishlistAndUpdateSignal(productId: string): void {
		this._unsubscribe();

		this._productSubscription = this._productService
			.addOrRemoveProductToWishlist({ productId, wishlistId: this._wishlistComponentService.getWishlistId() })
			.pipe(
				map((response: SuccessResponse<ProductDetailsResponse>) => {
					this._productListInWishlist.update(currentWishlist => {
						return this._updateCurrentProductList(currentWishlist, productId, response);
					});
				}),
			)
			.subscribe();
	}

	public setProductListInWishlist(products: ProductResponse[]): void {
		this._productListInWishlist.set(products);
	}

	public getProductListInWishlist(): ProductResponse[] {
		return this._productListInWishlist();
	}

	private _updateCurrentProductList(
		currentWishlist: ProductResponse[],
		productId: string,
		response: SuccessResponse<ProductDetailsResponse>,
	) {
		const productIndex = currentWishlist.findIndex(p => p.id === productId);

		return productIndex !== -1
			? currentWishlist.filter(p => p.id !== productId)
			: [...currentWishlist, response.result];
	}

	private _unsubscribe(): void {
		if (this._productSubscription) {
			this._productSubscription.unsubscribe();
		}
	}
}
