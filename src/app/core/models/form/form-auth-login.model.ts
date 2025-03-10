import { FormControl } from '@angular/forms';

export class FormAuthLogin {
	constructor(
		public email: FormControl<string | null>,
		public password: FormControl<string | null>,
	) {}
}
