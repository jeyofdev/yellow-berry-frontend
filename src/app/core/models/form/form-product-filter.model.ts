import { FormControl } from '@angular/forms';

export class FormProductFilter {
	constructor(
		public category: string[],
		public color: string[],
		public tag: string[],
		public price: number[],
		public weight: string[],
	) {}
}
