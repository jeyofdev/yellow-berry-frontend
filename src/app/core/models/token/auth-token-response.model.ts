import { RoleEnum } from '@enum/role.enum';

export class AuthTokenResponse {
	constructor(
		public role: RoleEnum,
		public id: string,
		public sub: string,
		public iat: number,
		public exp: number,
	) {}
}
