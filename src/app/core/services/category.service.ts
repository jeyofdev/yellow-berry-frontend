import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CategoryResponse } from '@models/category/category-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private _httpClient: HttpClient = inject(HttpClient);

	_BASE_URL = 'http://localhost:8080/api/v1/category';

	public findAll(): Observable<SuccessResponse<CategoryResponse[]>> {
		return this._httpClient.get<SuccessResponse<CategoryResponse[]>>(this._BASE_URL).pipe();
	}
}
