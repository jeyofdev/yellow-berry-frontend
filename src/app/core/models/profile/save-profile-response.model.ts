import { Profile } from '@models/profile/profile.model';

export class ProfileResponse extends Profile {
	constructor(
		public id: string,
		public override firstname: string,
		public override lastname: string,
		public override phone: string,
		public override address: string,
		public override region: string,
		public override department: string,
		public override zipCode: string,
		public override city: string,
	) {
		super(firstname, lastname, phone, address, region, department, zipCode, city);
	}
}
