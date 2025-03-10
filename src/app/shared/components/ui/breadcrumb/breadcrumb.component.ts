import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from '@shared/components/ui/layout/layout.component';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-breadcrumb',
	imports: [BreadcrumbModule, LayoutComponent, ImageModule],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
	public items: MenuItem[] | undefined;
	public home: MenuItem | undefined;
	public currentRouteTitle: WritableSignal<string> = signal<string>('');

	constructor(private _activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this._activatedRoute.data.subscribe(data => {
			this.currentRouteTitle.set(data['title']);
		});

		this.items = [{ label: 'home' }, ...this._activatedRoute.snapshot.url.map(el => ({ label: el.path }))];
	}
}
