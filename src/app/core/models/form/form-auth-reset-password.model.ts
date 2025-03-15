import { FormControl } from '@angular/forms';

export class FormAuthResetPassword {
	constructor(
		public password: FormControl<string>,
		public confirmPassword: FormControl<string>,
	) {}
}
