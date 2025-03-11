import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	/**
	 * save user login token to local storage
	 */
	setAuthToken(authTokenResponse: string): void {
		localStorage.setItem('authToken', authTokenResponse);
	}

	/**
	 * delete user login token in local storage
	 */
	clearAuthToken(): void {
		localStorage.removeItem('authToken');
	}
}
