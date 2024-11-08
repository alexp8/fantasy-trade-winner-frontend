import { Component, OnInit } from '@angular/core';
import { ViewFeedbackService } from '../../services/view-feedback.service';
import { Feedback, FeedbackResponse } from '../../models/feedback.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-feedback-view',
    templateUrl: './view-feedback.component.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./view-feedback.component.css']
})
export class FeedbackViewComponent implements OnInit {
    feedbackList: Feedback[] = [];
    currentPage: number = 1;
    totalPages: number = 0;
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    loading: boolean = true;
    error: string | null = null;

    constructor(private feedbackService: ViewFeedbackService) { }

    ngOnInit(): void {
        this.fetchFeedback(this.currentPage);
    }

    fetchFeedback(page: number): void {
        this.loading = true;
        this.feedbackService.getFeedback(page).subscribe({
            next: (response: FeedbackResponse) => {
                this.feedbackList = response.feedback_results;
                this.totalPages = response.total_pages;
                this.hasNext = response.has_next;
                this.hasPrevious = response.has_previous;
                this.currentPage = page;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load feedback data';
                this.loading = false;
            }
        });
      
    }

    goToNextPage(): void {
        if (this.hasNext)
            this.fetchFeedback(this.currentPage + 1);
    }

    goToPreviousPage(): void {
        if (this.hasPrevious)
            this.fetchFeedback(this.currentPage - 1);
    }
}
