import { FormControl } from '@angular/forms';

export class FormAuthRegisterInfo {
	constructor(
		public firstname: FormControl<string>,
		public lastname: FormControl<string>,
	) {}
}
