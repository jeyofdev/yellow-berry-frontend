import { HttpHeaders } from '@angular/common/http';

export class AuthQueryInfos {
	constructor(
		public authToken: string,
		public authUserId: string,
		public headers: HttpHeaders,
	) {}
}
