import { FormControl } from '@angular/forms';

export class FormAuthResetPassword {
	constructor(
		public password: FormControl<string | null>,
		public confirmPassword: FormControl<string | null>,
	) {}
}
