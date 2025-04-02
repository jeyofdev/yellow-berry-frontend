import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthQueryInfos } from '@models/token/auth-query-infos.model';
import { AuthTokenResponse } from '@models/token/auth-token-response.model';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthTokenService {
	private _localStorageService: LocalStorageService = inject(LocalStorageService);

	public decodeToken(authToken: string): AuthTokenResponse {
		return this._getDecodedTokenResponse(authToken);
	}

	public getAuthQueryInfos(): AuthQueryInfos {
		const authToken = this._localStorageService.getAuthToken() as string;

		const authUserId = this.decodeToken(authToken).id;
		const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

		return { authToken, authUserId, headers };
	}

	private _getDecodedTokenResponse(token: string): AuthTokenResponse {
		return jwtDecode(token);
	}
}
