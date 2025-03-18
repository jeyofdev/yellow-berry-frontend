import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SuccessResponse } from '@models/response/success-response.model';
import { TeamMemberResponse } from '@models/team-member/team-member-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TeamMemberService {
	private _httpClient: HttpClient = inject(HttpClient);

	private BASE_URL = 'http://localhost:8080/api/v1/team/member';

	public findAll(): Observable<SuccessResponse<TeamMemberResponse[]>> {
		return this._httpClient.get<SuccessResponse<TeamMemberResponse[]>>(this.BASE_URL);
	}
}
