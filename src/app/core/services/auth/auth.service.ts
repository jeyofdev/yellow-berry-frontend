import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LoginRequest } from '@models/auth/LoginRequest.model';
import { LoginResponse } from '@models/auth/LoginResponse.model';
import { MessageResponse } from '@models/auth/MessageResponse.model';
import { RegisterRequest } from '@models/auth/RegisterRequest.model';
import { RegisterResponse } from '@models/auth/RegisterResponse.model';
import { ResetPasswordRequest } from '@models/auth/ResetPassswordRequest.model';
import { SaveProfileRequest } from '@models/profile/save-profile-request.model';
import { ProfileResponse } from '@models/profile/save-profile-response.model';
import { SuccessResponse } from '@models/success-response.model';
import { LocalStorageService } from '@services/auth/local-storage.service';
import { ProfileService } from '@services/profile.service';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _localStorageService = inject(LocalStorageService);
	private _profileService: ProfileService = inject(ProfileService);

	private BASE_URL = 'http://localhost:8080/api/v1/auth';

	private loggedIn = signal<boolean>(false);

	public register(
		registerRequest: RegisterRequest,
		profileDatas: SaveProfileRequest,
	): Observable<SuccessResponse<ProfileResponse>> {
		return this._httpClient
			.post<RegisterResponse>(this.BASE_URL + '/register', registerRequest)
			.pipe(
				switchMap((registerResponse: RegisterResponse) =>
					this.login({ email: registerRequest.email, password: registerRequest.password }).pipe(
						switchMap((loginResponse: LoginResponse) =>
							this._profileService.save(loginResponse.token, registerResponse.userId, profileDatas),
						),
					),
				),
			);
	}

	public login(loginRequest: LoginRequest): Observable<LoginResponse> {
		return this._httpClient.post<LoginResponse>(this.BASE_URL + '/login', loginRequest).pipe(
			tap(response => {
				this._localStorageService.setAuthToken(response.token);
				this.setLoggedIn(true);
			}),
		);
	}

	public forgotPassword(email: string): Observable<MessageResponse> {
		return this._httpClient.post<MessageResponse>(this.BASE_URL + `/forgot-password?email=${email}`, {});
	}

	public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<MessageResponse> {
		return this._httpClient.post<MessageResponse>(
			this.BASE_URL +
				`/reset-password?resetToken=${resetPasswordRequest.resetToken}&newPassword=${resetPasswordRequest.newPassword}`,
			{},
		);
	}

	public setLoggedIn(value: boolean) {
		this.loggedIn.set(value);
	}

	public getLoggedIn(): boolean {
		return this.loggedIn();
	}
}
