import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class WishlistComponentService {
	private _wishlistId: WritableSignal<string> = signal<string>('');

	public setWishlistId(wishlistId: string): void {
		this._wishlistId.set(wishlistId);
	}

	public getWishlistId(): string {
		return this._wishlistId();
	}
}
