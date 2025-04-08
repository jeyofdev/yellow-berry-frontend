import { StatusEnum } from '@enum/status.enum';

export class SuccessMessageResponse {
	constructor(
		public status: StatusEnum,
		public message: string,
	) {}
}
