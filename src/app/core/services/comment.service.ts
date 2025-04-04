import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommentResponse } from '@models/comment/comment-response.model';
import { SaveCommentRequest } from '@models/comment/save-comment-request.model';
import { ProfileDetailsResponse } from '@models/profile/profile-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable, switchMap } from 'rxjs';
import { AuthTokenService } from './auth/auth-token.service';
import { ProfileService } from './profile.service';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _authTokenService: AuthTokenService = inject(AuthTokenService);
	private _profileService: ProfileService = inject(ProfileService);

	_BASE_URL = 'http://localhost:8080/api/v1/comment';

	public save(productId: string, commentDatas: SaveCommentRequest): Observable<SuccessResponse<CommentResponse>> {
		const { headers } = this._authTokenService.getAuthQueryInfos();

		return this._profileService.findByUserId().pipe(
			switchMap((profileResponse: SuccessResponse<ProfileDetailsResponse>) =>
				this._httpClient.post<SuccessResponse<CommentResponse>>(
					this._BASE_URL + `/product/${productId}/profile/${profileResponse.result.id}`,
					commentDatas,
					{
						headers,
					},
				),
			),
		);
	}
}
