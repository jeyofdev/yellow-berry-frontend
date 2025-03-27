import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProfileDetailsResponse } from '@models/profile/profile-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { AuthTokenService } from '@services/auth/auth-token.service';
import { LocalStorageService } from '@services/auth/local-storage.service';
import { ProfileService } from '@services/profile.service';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class WishlistService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _profileService: ProfileService = inject(ProfileService);
	private _localStorageService: LocalStorageService = inject(LocalStorageService);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);

	private BASE_URL = 'http://localhost:8080/api/v1/wishlist';

	public findByUserId(): Observable<SuccessResponse<WishlistDetailsResponse>> {
		const authToken = this._localStorageService.getAuthToken() as string;
		const authUserId = this._authTokenService._decodeToken(authToken).id;

		const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

		return this._profileService.findByUserId({ authToken, authUserId }).pipe(
			switchMap((profileResponse: SuccessResponse<ProfileDetailsResponse>) => {
				return this._httpClient.get<SuccessResponse<WishlistDetailsResponse>>(
					`${this.BASE_URL}/${profileResponse.result.wishlist.id}`,
					{ headers },
				);
			}),
		);
	}
}
