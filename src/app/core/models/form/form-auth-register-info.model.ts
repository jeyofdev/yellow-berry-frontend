import { FormControl } from '@angular/forms';

export class FormAuthRegisterInfo {
	constructor(
		public firstname: FormControl<string | null>,
		public lastname: FormControl<string | null>,
	) {}
}
