import { FormControl } from '@angular/forms';

export class FormAddToCart {
	constructor(
		public weight: FormControl<string>,
		public quantity: FormControl<number>,
	) {}
}
