import { Profile } from '@models/profile/profile.model';

export class FindProfileDetailsRequest {
	constructor(
		public authToken: string,
		public authUserId: string,
	) {}
}
