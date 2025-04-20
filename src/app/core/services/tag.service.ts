import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SuccessResponse } from '@models/response/success-response.model';
import { TagResponse } from '@models/tag/tag-response.model copy';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TagService {
	private _httpClient: HttpClient = inject(HttpClient);

	_BASE_URL = 'http://localhost:8080/api/v1/tag';

	public findAll(): Observable<SuccessResponse<TagResponse[]>> {
		return this._httpClient.get<SuccessResponse<TagResponse[]>>(this._BASE_URL);
	}
}
