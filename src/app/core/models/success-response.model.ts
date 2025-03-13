export class SuccessResponse<T> {
	constructor(
		public status: string,
		public result: T,
	) {}
}
