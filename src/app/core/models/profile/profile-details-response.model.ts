import { AddressDetailsFormat } from '@models/format/address-details-format.model';
import { NameDetailsFormat } from '@models/format/name-details-format.model';
import { ProfileResponse } from '@models/profile/profile-response.model';
import { Wishlist } from '@models/wishlist/wishlist.model';

export class ProfileDetailsResponse extends ProfileResponse {
	constructor(
		public override id: string,
		public override email: string,
		public override role: string,
		public override nameDetails: NameDetailsFormat,
		public override phone: string,
		public override addressDetails: AddressDetailsFormat,
		public wishlist: Wishlist,
	) {
		super(id, email, role, nameDetails, phone, addressDetails);
	}
}
