import { Routes } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { WishlistPageComponent } from '@features/account/pages/wishlist-page/wishlist-page.component';

export const routes: Routes = [
	{
		path: RouteEnum.WISHLIST,
		component: WishlistPageComponent,
		data: { title: 'wishlist' },
	},
];
