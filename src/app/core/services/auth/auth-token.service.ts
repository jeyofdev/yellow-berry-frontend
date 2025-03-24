import { Injectable } from '@angular/core';
import { AuthTokenResponse } from '@models/token/auth-token-response.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class AuthTokenService {
	public _decodeToken(authToken: string): AuthTokenResponse {
		return this._getDecodedTokenResponse(authToken);
	}

	private _getDecodedTokenResponse(token: string): AuthTokenResponse {
		return jwtDecode(token);
	}
}
