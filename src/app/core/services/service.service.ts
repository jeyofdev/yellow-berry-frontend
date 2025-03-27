import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SuccessResponse } from '@models/response/success-response.model';
import { ServiceResponse } from '@models/service/service-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ServService {
	private _httpClient: HttpClient = inject(HttpClient);

	private _BASE_URL = 'http://localhost:8080/api/v1/service';

	public findAll(): Observable<SuccessResponse<ServiceResponse[]>> {
		return this._httpClient.get<SuccessResponse<ServiceResponse[]>>(this._BASE_URL);
	}
}
