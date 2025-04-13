import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { ProductService } from '@services/product.service';
import { WishlistService } from '@services/wishlist.service';
import { Observable, Subscription, map, switchMap, take } from 'rxjs';
import { WishlistComponentService } from './wishlist-component.service';

@Injectable({
	providedIn: 'root',
})
export class WishlistProductComponentService {
	private _productService: ProductService = inject(ProductService);
	private _wishlistComponentService: WishlistComponentService = inject(WishlistComponentService);
	private _wishlistService: WishlistService = inject(WishlistService);

	private _productListInWishlist: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	private _productCountInWishlist = computed(() => this._productListInWishlist().length);

	private _productSubscription: Subscription | null = null;

	public addOrRemoveProductToWishlistAndUpdateSignal(productId: string): void {
		this._unsubscribe();

		const wishlistId = this._wishlistComponentService.getWishlistId();

		if (wishlistId) {
			this._productSubscription = this._handleAddOrRemove(productId).subscribe();
			return;
		}

		this._wishlistService
			.findByUserId()
			.pipe(
				take(1),
				map((wishlistResponse: SuccessResponse<WishlistDetailsResponse>) => {
					this._wishlistComponentService.setWishlistId(wishlistResponse.result.id);
				}),
				switchMap(() => this._handleAddOrRemove(productId)),
			)
			.subscribe();
	}

	public setProductListInWishlist(products: ProductResponse[]): void {
		this._productListInWishlist.set(products);
	}

	public getProductListInWishlist(): ProductResponse[] {
		return this._productListInWishlist();
	}

	public getProductCountInWishlist(): number {
		return this._productCountInWishlist();
	}

	public loadWishlist(): void {
		this._wishlistService
			.findByUserId()
			.pipe(
				map((wishlistResponse: SuccessResponse<WishlistDetailsResponse>) => {
					this._wishlistComponentService.setWishlistId(wishlistResponse.result.id);
					this.setProductListInWishlist(wishlistResponse.result.products.results);
				}),
			)
			.subscribe();
	}

	private _handleAddOrRemove(productId: string): Observable<void> {
		return this._productService
			.addOrRemoveProductToWishlist({
				productId,
				wishlistId: this._wishlistComponentService.getWishlistId(),
			})
			.pipe(
				map((response: SuccessResponse<ProductDetailsResponse>) => {
					this._productListInWishlist.update(currentWishlist =>
						this._updateCurrentProductList(currentWishlist, productId, response),
					);
				}),
			);
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
