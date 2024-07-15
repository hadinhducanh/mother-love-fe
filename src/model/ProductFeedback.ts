import { FeedbackDetail } from "./FeedbackDetail";
import { ProductsObj } from "./Product";

export interface ProductFeedback {
product: ProductsObj;
feedbackDetails: {
content: FeedbackDetail[];
} 
}
