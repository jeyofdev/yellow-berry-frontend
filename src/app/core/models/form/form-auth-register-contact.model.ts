import { FormControl } from '@angular/forms';

export class FormAuthRegisterContact {
	constructor(
		public email: FormControl<string | null>,
		public phone: FormControl<string | null>,
	) {}
}
