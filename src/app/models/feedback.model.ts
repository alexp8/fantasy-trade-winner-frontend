
export interface Feedback {
    category: string;
    message: string;
    created_at: string;
}

export interface FeedbackResponse {
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
    feedback_results: Feedback[];
}