import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WeightEnum } from '@enum/weight.enum';
import { FindProductByIdRequest } from '@models/product/find-product-by-id-request.model';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private _httpClient: HttpClient = inject(HttpClient);

	private BASE_URL = 'http://localhost:8080/api/v1/product';

	public findAll(): Observable<SuccessResponse<ProductResponse[]>> {
		return this._httpClient.get<SuccessResponse<ProductResponse[]>>(this.BASE_URL);
	}

	public findById(findProductByIdRequest: FindProductByIdRequest): Observable<SuccessResponse<ProductDetailsResponse>> {
		return this._httpClient.get<SuccessResponse<ProductDetailsResponse>>(
			`${this.BASE_URL}/${findProductByIdRequest.productId}`,
		);
	}
}
