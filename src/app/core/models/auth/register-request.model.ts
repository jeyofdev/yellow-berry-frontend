import { RoleEnum } from '@enum/role.enum';

export class RegisterRequest {
	constructor(
		public email: string,
		public password: string,
		public role: RoleEnum,
	) {}
}
