import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  loadingGif: String = "https://i.pinimg.com/originals/4d/0a/29/4d0a2935029461cd1135eeb9f0de58a4.gif";
  categories: string[] = ['Feedback / Suggestion', 'Issue / Error', 'Other'];
  contactForm: FormGroup;
  loading: boolean = false;
  error: string = '';
  submittedMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      category: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData = new Contact(
        this.contactForm.get('category')?.value,
        this.contactForm.get('message')?.value
      );

      this.loading = true;

      this.contactService.sendEmail(contactData).subscribe({
        next: (response: any) => {
          this.submittedMsg = "Feedback sent!";
          this.contactForm.reset();
        },
        error: (err) => {
          this.error = 'Failed to submit.';
          this.loading = false;
        }
      });
      this.loading = false;
    }
  }
}
