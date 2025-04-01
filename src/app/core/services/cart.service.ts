import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CartResponse } from '@models/cart/cart-response.model';
import { SaveCartRequest } from '@models/cart/save-cart-request.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from './auth/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _localStorageService: LocalStorageService = inject(LocalStorageService);

	private _BASE_URL = 'http://localhost:8080/api/v1/cart';

	public save(saveCartRequest: SaveCartRequest): Observable<SuccessResponse<CartResponse>> {
		const authToken = this._localStorageService.getAuthToken() as string;
		const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

		return this._httpClient.post<SuccessResponse<CartResponse>>(
			`${this._BASE_URL}/profile/${saveCartRequest.profileId}`,
			{},
			{ headers },
		);
	}
}
