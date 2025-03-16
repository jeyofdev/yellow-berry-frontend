export class ResetPasswordRequest {
	constructor(
		public resetToken: string,
		public newPassword: string,
	) {}
}
