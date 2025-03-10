import { Component, InputSignal, OnInit, input } from '@angular/core';

@Component({
	selector: 'app-link-form',
	imports: [],
	templateUrl: './link-form.component.html',
	styleUrl: './link-form.component.scss',
})
export class LinkFormComponent implements OnInit {
	public label: InputSignal<string> = input.required<string>();
	public styleClass: InputSignal<'next' | 'info'> = input<'next' | 'info'>('next');

	public className!: string;

	ngOnInit() {
		this.className = `link-form-${this.styleClass()}`;
	}
}
