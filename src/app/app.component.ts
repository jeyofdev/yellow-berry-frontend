import { Component } from '@angular/core';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [HomePageComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {}
