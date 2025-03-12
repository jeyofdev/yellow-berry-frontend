import { FormControl } from '@angular/forms';

export class FormAuthRegisterAddress {
	constructor(
		public address: FormControl<string | null>,
		public region: FormControl<string | null>,
		public department: FormControl<string | null>,
		public zipCode: FormControl<string | null>,
		public city: FormControl<string | null>,
	) {}
}
