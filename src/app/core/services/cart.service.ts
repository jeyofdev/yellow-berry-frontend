import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { CartResponse } from '@models/cart/cart-response.model';
import { SaveCartRequest } from '@models/cart/save-cart-request.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { SaveProductToCartRequest } from '@models/product-to-cart/save-product-to-cart-request.model';
import { SuccessMessageResponse } from '@models/response/success-message-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable, switchMap } from 'rxjs';
import { parseWeightStringToEnumKey } from '@utils/enum.utils';
import { AuthTokenService } from './auth/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);

	private _BASE_URL = 'http://localhost:8080/api/v1/cart';
	private _PRODUCT_TO_CART_URL = 'http://localhost:8080/api/v1/productToCart';

	public save(saveCartRequest: SaveCartRequest): Observable<SuccessResponse<CartResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.post<SuccessResponse<CartResponse>>(
			`${this._BASE_URL}/profile/${saveCartRequest.profileId}`,
			{},
			{ headers },
		);
	}

	public findByUserId(): Observable<SuccessResponse<CartDetailsResponse>> {
		const { authUserId, headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.get<SuccessResponse<CartDetailsResponse>>(`${this._BASE_URL}/user/${authUserId}`, {
			headers,
		});
	}

	public update(cartId: string): Observable<SuccessResponse<CartDetailsResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.put<SuccessResponse<CartDetailsResponse>>(`${this._BASE_URL}/${cartId}`, {}, { headers });
	}

	public addProductToCart(
		productId: string,
		saveProductToCartRequest: SaveProductToCartRequest,
	): Observable<SuccessResponse<ProductToCartResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		const weightEnumKey = parseWeightStringToEnumKey(saveProductToCartRequest.weight);
		const body = { ...saveProductToCartRequest, weight: weightEnumKey };

		return this.findByUserId().pipe(
			switchMap((cartDetailsresponse: SuccessResponse<CartDetailsResponse>) => {
				return this._httpClient.post<SuccessResponse<ProductToCartResponse>>(
					`${this._PRODUCT_TO_CART_URL}/product/${productId}/cart/${cartDetailsresponse.result.id}`,
					body,
					{ headers },
				);
			}),
		);
	}

	public removeProductFromCart(productToCartId: string): Observable<SuccessResponse<SuccessMessageResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.delete<SuccessResponse<SuccessMessageResponse>>(
			`${this._PRODUCT_TO_CART_URL}/${productToCartId}`,
			{ headers },
		);
	}

	public updateProductFromCart(
		productToCartId: string,
		updateProductToCartRequest: Partial<SaveProductToCartRequest>,
	): Observable<SuccessResponse<CartDetailsResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.put<SuccessResponse<CartDetailsResponse>>(
			`${this._PRODUCT_TO_CART_URL}/${productToCartId}`,
			updateProductToCartRequest,
			{ headers },
		);
	}
}
