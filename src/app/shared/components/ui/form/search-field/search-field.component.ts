import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

interface City {
	name: string;
	code: string;
}

@Component({
	selector: 'app-search-field',
	imports: [
		FormsModule,
		InputTextModule,
		IconFieldModule,
		InputIconModule,
		ImageModule,
		SelectModule,
	],
	templateUrl: './search-field.component.html',
	styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnInit {
	cities: City[] | undefined;

	selectedCity: City | undefined;

	ngOnInit() {
		this.cities = [
			{ name: 'New York', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' },
		];
	}
}
