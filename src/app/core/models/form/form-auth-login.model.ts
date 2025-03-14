import { FormControl } from '@angular/forms';

export class FormAuthLogin {
	constructor(
		public email: FormControl<string>,
		public password: FormControl<string>,
	) {}
}
