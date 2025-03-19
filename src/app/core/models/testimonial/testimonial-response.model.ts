import { JobEnum } from '@enum/job.enum';

export class TestimonialResponse {
	constructor(
		public id: string,
		public name: string,
		public job: JobEnum,
		public message: string,
	) {}
}
