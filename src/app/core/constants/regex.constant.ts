export class Regex {
	static readonly EMAIL_PATTERN = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

	static readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/;

	static readonly TEXT_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

	static readonly PHONE_PATTERN = /^0[1-9]-(\d{2}-){3}(\d{2})$/;

	static readonly ZIP_CODE_PATTERN = /^(\d){5}$/;
}
