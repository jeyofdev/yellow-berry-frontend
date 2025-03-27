import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ForgotPasswordRequest } from '@models/auth/forgot-password-request.model';
import { LoginRequest } from '@models/auth/login-request.model';
import { LoginResponse } from '@models/auth/login-response.model';
import { RegisterRequest } from '@models/auth/register-request.model';
import { RegisterResponse } from '@models/auth/register-response.model';
import { ResetPasswordRequest } from '@models/auth/reset-password-request.model';
import { SaveProfileRequest } from '@models/profile/save-profile-request.model';
import { ProfileResponse } from '@models/profile/save-profile-response.model';
import { MessageResponse } from '@models/response/message-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
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

	private _BASE_URL = 'http://localhost:8080/api/v1/auth';

	private _loggedIn = signal<boolean>(false);

	constructor() {
		this._checkAuthTokenExist();
	}

	public register(
		registerRequest: RegisterRequest,
		profileDatas: SaveProfileRequest,
	): Observable<SuccessResponse<ProfileResponse>> {
		return this._httpClient
			.post<RegisterResponse>(this._BASE_URL + '/register', registerRequest)
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
		return this._httpClient.post<LoginResponse>(this._BASE_URL + '/login', loginRequest).pipe(
			tap(response => {
				this._localStorageService.setAuthToken(response.token);
				this.setLoggedIn(true);
			}),
		);
	}

	public forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<MessageResponse> {
		return this._httpClient.post<MessageResponse>(
			this._BASE_URL + `/forgot-password?email=${forgotPasswordRequest.email}`,
			{},
		);
	}

	public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<MessageResponse> {
		return this._httpClient.post<MessageResponse>(
			this._BASE_URL +
				`/reset-password?resetToken=${resetPasswordRequest.resetToken}&newPassword=${resetPasswordRequest.newPassword}`,
			{},
		);
	}

	public logout(): void {
		this._localStorageService.clearAuthToken();
		this.setLoggedIn(false);
	}

	public setLoggedIn(value: boolean) {
		this._loggedIn.set(value);
	}

	public getLoggedIn(): boolean {
		return this._loggedIn();
	}

	private _checkAuthTokenExist() {
		const authToken: string | null = this._localStorageService.getAuthToken();
		this.setLoggedIn(!!authToken);
	}
}
