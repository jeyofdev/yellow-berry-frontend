import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JobEnum } from '@enum/job.enum';
import { SuccessResponse } from '@models/response/success-response.model';
import { TestimonialResponse } from '@models/testimonial/testimonial-response.model';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TestimonialService {
	private _httpClient: HttpClient = inject(HttpClient);

	private _BASE_URL = 'http://localhost:8080/api/v1/testimonial';

	public findAll(): Observable<SuccessResponse<TestimonialResponse[]>> {
		return this._httpClient.get<SuccessResponse<TestimonialResponse[]>>(this._BASE_URL).pipe(
			map((response: SuccessResponse<TestimonialResponse[]>) => {
				response.result.forEach(testimonial => {
					testimonial.job = JobEnum[testimonial.job as keyof typeof JobEnum];
				});

				return response;
			}),
		);
	}
}
