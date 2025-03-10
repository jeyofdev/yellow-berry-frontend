import { FormControl } from '@angular/forms';

export type FormAuthLogin = {
	email: FormControl<string | null>;
	password: FormControl<string | null>;
};
