import { Component, OnInit, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
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
export class BreadcrumbComponent implements OnInit {
	private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	public items: MenuItem[] | undefined;
	public home: MenuItem | undefined;

	public currentRouteTitle: Signal<string> = toSignal(this._activatedRoute.data.pipe(map(data => data['title'])), {
		initialValue: '',
	});

	ngOnInit() {
		const isPageNotFound = this._activatedRoute.snapshot.routeConfig?.path === '**';

		this.items = isPageNotFound
			? [{ label: 'home' }, { label: '404 - not found' }]
			: [{ label: 'home' }, ...this._activatedRoute.snapshot.url.map(el => ({ label: el.path }))];
	}
}
