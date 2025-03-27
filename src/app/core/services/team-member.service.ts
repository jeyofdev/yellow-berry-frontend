import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JobEnum } from '@enum/job.enum';
import { SuccessResponse } from '@models/response/success-response.model';
import { TeamMemberResponse } from '@models/team-member/team-member-response.model';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TeamMemberService {
	private _httpClient: HttpClient = inject(HttpClient);

	private _BASE_URL = 'http://localhost:8080/api/v1/team/member';

	public findAll(): Observable<SuccessResponse<TeamMemberResponse[]>> {
		return this._httpClient.get<SuccessResponse<TeamMemberResponse[]>>(this._BASE_URL).pipe(
			map((response: SuccessResponse<TeamMemberResponse[]>) => {
				response.result.forEach(member => {
					member.job = JobEnum[member.job as keyof typeof JobEnum];
				});

				return response;
			}),
		);
	}
}
