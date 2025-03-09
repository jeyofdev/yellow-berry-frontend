import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

interface Category {
	name: string;
}

@Component({
	selector: 'app-search-field',
	imports: [FormsModule, InputTextModule, IconFieldModule, InputIconModule, ImageModule, SelectModule],
	templateUrl: './search-field.component.html',
	styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnInit {
	categories: Category[] | undefined;

	selectedCategory: Category | undefined;

	ngOnInit() {
		this.categories = [{ name: 'Fruits' }, { name: 'Bakery' }, { name: 'Cold Drinks' }, { name: 'Vegetables' }];
	}
}
