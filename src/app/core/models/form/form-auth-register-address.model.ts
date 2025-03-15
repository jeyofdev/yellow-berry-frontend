import { FormControl } from '@angular/forms';

export class FormAuthRegisterAddress {
	constructor(
		public address: FormControl<string>,
		public region: FormControl<string>,
		public department: FormControl<string>,
		public zipCode: FormControl<string>,
		public city: FormControl<string>,
	) {}
}
