import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BrandResponse } from '@models/brand/brand-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BrandService {
	private _httpClient: HttpClient = inject(HttpClient);

	_BASE_URL = 'http://localhost:8080/api/v1/brand';

	public findAll(): Observable<SuccessResponse<BrandResponse[]>> {
		return this._httpClient.get<SuccessResponse<BrandResponse[]>>(this._BASE_URL).pipe();
	}
}
