import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SaveProfileRequest } from '@models/profile/save-profile-request.model';
import { ProfileResponse } from '@models/profile/save-profile-response.model';
import { SuccessResponse } from '@models/success-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private _httpClient: HttpClient = inject(HttpClient);

	private BASE_URL = 'http://localhost:8080/api/v1/profile';

	public save(
		authToken: string,
		userId: string,
		profileDatas: SaveProfileRequest,
	): Observable<SuccessResponse<ProfileResponse>> {
		const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
		return this._httpClient.post<SuccessResponse<ProfileResponse>>(this.BASE_URL + `/user/${userId}`, profileDatas, {
			headers,
		});
	}
}
