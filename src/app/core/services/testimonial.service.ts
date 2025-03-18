import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SuccessResponse } from '@models/response/success-response.model';
import { TestimonialResponse } from '@models/testimonial/testimonial-response.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TestimonialService {
	private _httpClient: HttpClient = inject(HttpClient);

	private BASE_URL = 'http://localhost:8080/api/v1/testimonial';

	public findAll(): Observable<SuccessResponse<TestimonialResponse[]>> {
		return this._httpClient.get<SuccessResponse<TestimonialResponse[]>>(this.BASE_URL);
	}
}
