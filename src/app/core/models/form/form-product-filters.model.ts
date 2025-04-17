import { FormControl } from '@angular/forms';

export class FormProductFilters {
	constructor(
		public category: FormControl<string[]>,
		public color: FormControl<string[]>,
	) {}
}
