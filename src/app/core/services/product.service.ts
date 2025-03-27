import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddOrRemoveProductToWishlistRequest } from '@models/product/add-or-remove-product-to-wishlist-request.model';
import { FindProductByIdRequest } from '@models/product/find-product-by-id-request.model';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { LocalStorageService } from '@services/auth/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _localStorageService: LocalStorageService = inject(LocalStorageService);

	private BASE_URL = 'http://localhost:8080/api/v1/product';

	public findAll(): Observable<SuccessResponse<ProductResponse[]>> {
		return this._httpClient.get<SuccessResponse<ProductResponse[]>>(this.BASE_URL);
	}

	public findById(findProductByIdRequest: FindProductByIdRequest): Observable<SuccessResponse<ProductDetailsResponse>> {
		return this._httpClient.get<SuccessResponse<ProductDetailsResponse>>(
			`${this.BASE_URL}/${findProductByIdRequest.productId}`,
		);
	}

	public addOrRemoveProductToWishlist(
		addOrRemoveProductToWishlistRequest: AddOrRemoveProductToWishlistRequest,
	): Observable<SuccessResponse<ProductDetailsResponse>> {
		const authToken = this._localStorageService.getAuthToken() as string;
		const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

		return this._httpClient.post<SuccessResponse<ProductDetailsResponse>>(
			`${this.BASE_URL}/${addOrRemoveProductToWishlistRequest.productId}/wishlist/${addOrRemoveProductToWishlistRequest.wishlistId}`,
			{},
			{ headers },
		);
	}
}
