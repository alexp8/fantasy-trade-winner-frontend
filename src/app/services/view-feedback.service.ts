import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackResponse } from '../models/feedback.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ViewFeedbackService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getFeedback(page: number): Observable<FeedbackResponse> {
        let url: string = `${this.apiUrl}/api/get_feedback?page=${page}`;

        return this.http.get<FeedbackResponse>(url);
    }

}
