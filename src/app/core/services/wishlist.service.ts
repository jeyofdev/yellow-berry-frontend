import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProfileDetailsResponse } from '@models/profile/profile-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { AuthTokenService } from '@services/auth/auth-token.service';
import { ProfileService } from '@services/profile.service';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class WishlistService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _profileService: ProfileService = inject(ProfileService);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);

	private _BASE_URL = 'http://localhost:8080/api/v1/wishlist';

	public findByUserId(): Observable<SuccessResponse<WishlistDetailsResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._profileService.findByUserId().pipe(
			switchMap((profileResponse: SuccessResponse<ProfileDetailsResponse>) => {
				return this._httpClient.get<SuccessResponse<WishlistDetailsResponse>>(
					`${this._BASE_URL}/${profileResponse.result.wishlist.id}`,
					{ headers },
				);
			}),
		);
	}
}
