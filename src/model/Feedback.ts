import { ProductsObj } from "./Product";
import { User } from "./User";

  export interface Feedback {
    feedbackId: number;
    rating: number;
    comment: string;
    image: string;
    feedbackDate: string;
    product: ProductsObj;
    user: User;
  }