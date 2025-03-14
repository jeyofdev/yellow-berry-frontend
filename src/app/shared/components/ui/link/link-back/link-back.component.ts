import { Component, InputSignal, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';

@Component({
	selector: 'app-link-back',
	imports: [RouterModule],
	templateUrl: './link-back.component.html',
})
export class LinkBackComponent implements OnInit {
	public label: InputSignal<string> = input.required<string>();
	public route: InputSignal<RouteEnum> = input.required<RouteEnum>();

	public link!: string;

	ngOnInit() {
		this.link = `/${this.route()}`;
	}
}
