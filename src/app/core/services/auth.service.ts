import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { LoginRequest } from '@models/auth/LoginRequest.model';
import { LoginResponse } from '@models/auth/LoginResponse.model';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _httpClient: HttpClient = inject(HttpClient);
	private BASE_URL = 'http://localhost:8080/api/v1/auth';

	private loggedIn = signal<boolean>(false);

	public login(loginRequest: LoginRequest): Observable<LoginResponse> {
		return this._httpClient.post<LoginResponse>(this.BASE_URL + '/login', loginRequest).pipe(
			tap(() => {
				this.setLoggedIn(true);
			}),
		);
	}

	public setLoggedIn(value: boolean) {
		this.loggedIn.set(value);
	}

	public getLoggedIn(): boolean {
		return this.loggedIn();
	}

	public isLoggedIn(): boolean {
		return this.loggedIn();
	}
}
