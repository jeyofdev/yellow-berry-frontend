import { Component, InputSignal, Signal, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { capitalizeFirstLetter } from 'app/core/utils/text.utils';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

@Component({
	selector: 'app-breadcrumb',
	imports: [BreadcrumbModule, LayoutBaseComponent, ImageModule],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	public productName: InputSignal<string> = input<string>('');

	public pathItems: MenuItem[] | undefined;
	public home: MenuItem | undefined;

	public currentRouteTitle: Signal<string> = toSignal(this._activatedRoute.data.pipe(map(data => data['title'])), {
		initialValue: '',
	});

	constructor() {
		effect(() => {
			this.setPathItems();
		});
	}

	public setPathItems(): void {
		const isPageNotFound = this._activatedRoute.snapshot.routeConfig?.path === '**';
		const isPageProductNotFound = this._activatedRoute.snapshot.routeConfig?.path === RouteEnum.NOT_FOUND;

		this.pathItems = [{ label: 'Home' }];

		const subPath: MenuItem | null = this._activatedRoute.snapshot.routeConfig?.data?.['title']
			? { label: capitalizeFirstLetter(this._activatedRoute.snapshot.routeConfig?.data?.['title']) }
			: null;

		if (isPageNotFound) {
			this.pathItems = [...this.pathItems, { label: 'Page not found' }];
		} else if (isPageProductNotFound) {
			this.pathItems = [...this.pathItems, { label: 'Product not found' }];
		} else if (this.productName()) {
			if (subPath) {
				this.pathItems = [...this.pathItems, subPath, { label: this.productName() }];
			} else {
				this.pathItems = [...this.pathItems, { label: this.productName() }];
			}
		} else {
			this.pathItems = [
				...this.pathItems,
				...this._activatedRoute.snapshot.url.map(el => ({
					label: capitalizeFirstLetter(el.path),
				})),
			];
		}
	}
}
