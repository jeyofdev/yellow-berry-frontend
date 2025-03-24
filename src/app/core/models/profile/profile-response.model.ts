import { AddressDetailsFormat } from '@models/format/address-details-format.model';
import { NameDetailsFormat } from '@models/format/name-details-format.model';

export class ProfileResponse {
	constructor(
		public id: string,
		public email: string,
		public role: string,
		public nameDetails: NameDetailsFormat,
		public phone: string,
		public addressDetails: AddressDetailsFormat,
	) {}
}
