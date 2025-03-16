import { FormGroup } from '@angular/forms';
import { FormAuthRegisterAddress } from './form-auth-register-address.model';
import { FormAuthRegisterContact } from './form-auth-register-contact.model';
import { FormAuthRegisterInfo } from './form-auth-register-info.model';
import { FormAuthRegisterPassword } from './form-auth-register-password.model';

export class FormAuthRegister {
	constructor(
		public userInfoGroup: FormGroup<FormAuthRegisterInfo>,
		public userContactGroup: FormGroup<FormAuthRegisterContact>,
		public userAddressGroup: FormGroup<FormAuthRegisterAddress>,
		public userPasswordGroup: FormGroup<FormAuthRegisterPassword>,
	) {}
}
