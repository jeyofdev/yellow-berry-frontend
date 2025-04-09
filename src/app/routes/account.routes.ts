import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { CartPageComponent } from '@features/account/pages/cart-page/cart-page.component';
import { WishlistPageComponent } from '@features/account/pages/wishlist-page/wishlist-page.component';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
	{
		path: RouteEnum.WISHLIST,
		component: WishlistPageComponent,
		data: { title: 'wishlist' },
		canActivate: [authGuard],
	},
	{
		path: RouteEnum.CART,
		component: CartPageComponent,
		data: { title: 'cart' },
		canActivate: [authGuard],
	},
];
