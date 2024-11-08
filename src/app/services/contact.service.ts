import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private apiUrl = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) { }

    sendEmail(contact: Contact): Observable<any> {
        let url: string = `${this.apiUrl}/api/submit_feedback`;

        return this.http.post(url, contact);
    }
}
