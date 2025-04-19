import { FormControl } from '@angular/forms';

export class FormProductFilters {
	constructor(
		public category: FormControl<string[]>,
		public color: FormControl<string[]>,
		public tag: FormControl<string[]>,
		public price: FormControl<number[]>,
		public weight: FormControl<string[]>,
	) {}
}
