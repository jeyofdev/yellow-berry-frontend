import { FormControl } from '@angular/forms';

export class FormAuthRegisterPassword {
	constructor(
		public password: FormControl<string>,
		public confirmPassword: FormControl<string>,
	) {}
}
