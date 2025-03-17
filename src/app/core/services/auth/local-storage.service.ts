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
	 * get user token from local storage
	 */
	getAuthToken(): string | null {
		const tokenId: string | null = localStorage.getItem('authToken');

		if (tokenId) {
			return tokenId;
		}

		return null;
	}

	/**
	 * delete user login token in local storage
	 */
	clearAuthToken(): void {
		localStorage.removeItem('authToken');
	}
}
