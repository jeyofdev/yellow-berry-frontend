import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LoginRequest } from '@models/auth/LoginRequest.model';
import { LoginResponse } from '@models/auth/LoginResponse.model';
import { MessageResponse } from '@models/auth/MessageResponse.model';
import { RegisterRequest } from '@models/auth/RegisterRequest.model';
import { RegisterResponse } from '@models/auth/RegisterResponse.model';
import { LocalStorageService } from '@services/auth/local-storage.service';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _localStorageService = inject(LocalStorageService);

	private BASE_URL = 'http://localhost:8080/api/v1/auth';

	private loggedIn = signal<boolean>(false);

	public register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
		return this._httpClient.post<RegisterResponse>(this.BASE_URL + '/register', registerRequest);
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

	public setLoggedIn(value: boolean) {
		this.loggedIn.set(value);
	}

	public getLoggedIn(): boolean {
		return this.loggedIn();
	}
}
