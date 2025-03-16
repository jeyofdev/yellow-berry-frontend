import { FormControl } from '@angular/forms';

export class FormAuthRegisterContact {
	constructor(
		public email: FormControl<string>,
		public phone: FormControl<string>,
	) {}
}
