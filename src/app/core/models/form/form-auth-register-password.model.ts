import { FormControl } from '@angular/forms';

export class FormAuthRegisterPassword {
	constructor(
		public password: FormControl<string | null>,
		public confirmPassword: FormControl<string | null>,
	) {}
}
