import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CartDetailsResponse } from '@models/cart/cart-details-response.model';
import { CartResponse } from '@models/cart/cart-response.model';
import { SaveCartRequest } from '@models/cart/save-cart-request.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);

	private _BASE_URL = 'http://localhost:8080/api/v1/cart';

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
}
