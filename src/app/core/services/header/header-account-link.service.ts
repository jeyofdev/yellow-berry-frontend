import { Injectable, WritableSignal, computed, effect, inject } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { HeaderAccountLink } from '@models/header/header-account-link.model';
import { AuthService } from '@services/auth/auth.service';
import { CartComponentService } from '@services/components/cart-component.service';
import { WishlistProductComponentService } from '@services/components/wishlist-product-component.service';
import { pluralizeText } from 'app/core/utils/text.utils';

@Injectable({
	providedIn: 'root',
})
export class HeaderAccountLinkService {
	private _router: Router = inject(Router);
	private _authService: AuthService = inject(AuthService);
	private _wishlistProductComponentService: WishlistProductComponentService = inject(WishlistProductComponentService);
	private _cartComponentService: CartComponentService = inject(CartComponentService);

	constructor() {
		effect(() => {
			if (this._authService.getLoggedIn()) {
				this._wishlistProductComponentService.loadWishlist();
				this._cartComponentService.loadCart();
			}

			this.setAuthAccountLinks();
		});
	}

	private _headerAccountLinks = computed<HeaderAccountLink[]>(() => {
		return [
			{
				label: this._authService.getLoggedIn() ? 'Account' : 'Login',
				sublabel: 'Account',
				icon: 'account',
			},
			{
				label: 'Wishlist',
				sublabel: this._authService.getLoggedIn()
					? pluralizeText(this._wishlistProductComponentService.getProductCountInWishlist(), 'item')
					: 'item',
				icon: 'wishlist',
				redirectTo: '/' + RouteEnum.ACCOUNT_WISHLIST,
			},
			{
				label: 'cart',
				sublabel: this._authService.getLoggedIn()
					? pluralizeText(this._cartComponentService.productCountInCart(), 'item')
					: 'item',
				icon: 'cart',
			},
		];
	});

	private _authAccountLinksChildren: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([]);

	private _notConnectedAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Register',
			sublabel: '',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.AUTH_REGISTER),
		},
		{
			label: 'Login',
			sublabel: '',
			icon: '',
			command: () => this._router.navigateByUrl('/' + RouteEnum.AUTH_LOGIN),
		},
	]);

	private _connectedAccountLinks: WritableSignal<HeaderAccountLink[]> = signal<HeaderAccountLink[]>([
		{
			label: 'Profile',
			sublabel: '',
			icon: '',
		},
		{
			label: 'Logout',
			sublabel: '',
			icon: '',
			command: () => {
				this._authService.logout();
				this._router.navigate(['/' + RouteEnum.AUTH_LOGIN], {
					queryParams: { returnUrl: this._router.routerState.snapshot.url },
				});
			},
		},
	]);

	public getHeaderAccountLinks() {
		return this._headerAccountLinks;
	}

	public getAuthAccountLinks() {
		return this._authAccountLinksChildren;
	}

	public setAuthAccountLinks() {
		if (this._authService.getLoggedIn()) {
			this._authAccountLinksChildren.set(this._connectedAccountLinks());
		} else {
			this._authAccountLinksChildren.set(this._notConnectedAccountLinks());
		}

		return this._authAccountLinksChildren;
	}
}
