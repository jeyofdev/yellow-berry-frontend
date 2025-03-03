import { Component } from '@angular/core';
import { HelloComponent } from './components/hello/hello.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [HelloComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {}
