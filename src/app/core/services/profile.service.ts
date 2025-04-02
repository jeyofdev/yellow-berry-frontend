import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProfileDetailsResponse } from '@models/profile/profile-details-response.model';
import { SaveProfileRequest } from '@models/profile/save-profile-request.model';
import { ProfileResponse } from '@models/profile/save-profile-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);

	private _BASE_URL = 'http://localhost:8080/api/v1/profile';

	public save(userId: string, profileDatas: SaveProfileRequest): Observable<SuccessResponse<ProfileResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.post<SuccessResponse<ProfileResponse>>(this._BASE_URL + `/user/${userId}`, profileDatas, {
			headers,
		});
	}

	public findByUserId(): Observable<SuccessResponse<ProfileDetailsResponse>> {
		const { headers, authUserId } = this._authTokenService.getAuthQueryInfos();

		return this._httpClient.get<SuccessResponse<ProfileDetailsResponse>>(`${this._BASE_URL}/user/${authUserId}`, {
			headers,
		});
	}
}
