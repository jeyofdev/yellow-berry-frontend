import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FaqResponse } from '@models/faq/faq-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FaqService {
	private _httpClient: HttpClient = inject(HttpClient);

	private BASE_URL = 'http://localhost:8080/api/v1/faq';

	public findAll(): Observable<SuccessResponse<FaqResponse[]>> {
		return this._httpClient.get<SuccessResponse<FaqResponse[]>>(this.BASE_URL);
	}
}
