import { Component, InputSignal, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteEnum } from '@enum/route.enum';
import { LinkClassNameInput } from '@type/link-input.type';

@Component({
	selector: 'app-link-form',
	imports: [RouterModule],
	templateUrl: './link-form.component.html',
	styleUrl: './link-form.component.scss',
})
export class LinkFormComponent implements OnInit {
	public label: InputSignal<string> = input.required<string>();
	public route: InputSignal<RouteEnum> = input.required<RouteEnum>();
	public styleClass: InputSignal<LinkClassNameInput> = input<LinkClassNameInput>('next');

	public className!: string;
	public link!: string;

	ngOnInit() {
		this.className = `link-form-${this.styleClass()}`;
		this.link = `/${this.route()}`;
	}
}
