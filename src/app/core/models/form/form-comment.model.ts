import { FormControl } from '@angular/forms';

export class FormComment {
	constructor(
		public rating: FormControl<number>,
		public comment: FormControl<string>,
	) {}
}
