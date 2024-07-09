import { User } from "./User";

export interface FeedbackDetail {
  feedbackId: number;
  rating: number;
  comment: string;
  image: string;
  feedbackDate: string;
  user: User;
}