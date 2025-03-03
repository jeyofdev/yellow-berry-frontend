import { Component } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-hello',
	imports: [],
	templateUrl: './hello.component.html',
	styleUrl: './hello.component.scss',
})
export class HelloComponent {
	constructor() {
		console.log('hello');
	}
}
