import { StatusEnum } from '@enum/status.enum';

export class SuccessResponse<T> {
	constructor(
		public status: StatusEnum,
		public result: T,
	) {}
}
