import { JobEnum } from '@enum/job.enum';
import { SocialDetailsFormat } from '@models/format/social-details-format.model';

export class TeamMemberResponse {
	constructor(
		public id: string,
		public name: string,
		public job: JobEnum,
		public social: SocialDetailsFormat,
	) {}
}
