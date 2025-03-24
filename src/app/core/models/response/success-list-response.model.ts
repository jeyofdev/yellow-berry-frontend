import { StatusEnum } from '@enum/status.enum';

export class SuccessListResponse<T> {
	constructor(
		public status: StatusEnum,
		public results: T[],
	) {}
}
