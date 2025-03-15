import { AddressDetailsFormat } from '@models/format/AddressDetailsFormat';
import { NameDetailsFormat } from '@models/format/NameDetailsFormat';

export class ProfileResponse {
	constructor(
		public id: string,
		public email: string,
		public role: string,
		public nameDetails: NameDetailsFormat,
		public phone: string,
		public address: AddressDetailsFormat,
	) {}
}
