import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddOrRemoveProductToWishlistRequest } from '@models/product/add-or-remove-product-to-wishlist-request.model';
import { FindProductByIdRequest } from '@models/product/find-product-by-id-request.model';
import { FindProductsByCategoryExcludeCurrentProductRequest } from '@models/product/find-products-by-categories-exclude-current-product-request.model';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);

	private _BASE_URL = 'http://localhost:8080/api/v1/product';

	public findAll(): Observable<SuccessResponse<ProductResponse[]>> {
		return this._httpClient.get<SuccessResponse<ProductResponse[]>>(this._BASE_URL);
	}

	public findById(findProductByIdRequest: FindProductByIdRequest): Observable<SuccessResponse<ProductDetailsResponse>> {
		return this._httpClient.get<SuccessResponse<ProductDetailsResponse>>(
			`${this._BASE_URL}/${findProductByIdRequest.productId}`,
		);
	}

	public findByCategoryIdOrderedByIdExcludingProductId(
		request: FindProductsByCategoryExcludeCurrentProductRequest,
	): Observable<SuccessResponse<ProductResponse[]>> {
		return this._httpClient.get<SuccessResponse<ProductResponse[]>>(
			`${this._BASE_URL}/${request.productId}/category/${request.categoryId}`,
		);
	}

	public findTopProductsByDiscount(): Observable<SuccessResponse<ProductResponse[]>> {
		return this._httpClient.get<SuccessResponse<ProductResponse[]>>(`${this._BASE_URL}/discount`);
	}

	public addOrRemoveProductToWishlist(
		addOrRemoveProductToWishlistRequest: AddOrRemoveProductToWishlistRequest,
	): Observable<SuccessResponse<ProductDetailsResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.post<SuccessResponse<ProductDetailsResponse>>(
			`${this._BASE_URL}/${addOrRemoveProductToWishlistRequest.productId}/wishlist/${addOrRemoveProductToWishlistRequest.wishlistId}`,
			{},
			{ headers },
		);
	}
}
