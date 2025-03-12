import { FormControl, FormGroup } from '@angular/forms';
import { FormAuthRegisterAddress } from './form-auth-register-address.model';
import { FormAuthRegisterContact } from './form-auth-register-contact.model';
import { FormAuthRegisterInfo } from './form-auth-register-info.model';
import { FormAuthRegisterPassword } from './form-auth-register-password.model';

export class FormAuthRegister {
	constructor(
		public info: FormGroup<FormAuthRegisterInfo>,
		public contact: FormGroup<FormAuthRegisterContact>,
		public address: FormGroup<FormAuthRegisterAddress>,
		public password: FormGroup<FormAuthRegisterPassword>,
	) {}
}
