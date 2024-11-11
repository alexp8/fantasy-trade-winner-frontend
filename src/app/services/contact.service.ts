import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    sendEmail(contact: Contact): Observable<any> {
        let url: string = `${this.apiUrl}/api/submit_feedback`;

        return this.http.post(url, contact);
    }
}
