import { OrderDto } from "./Order";

interface Payment {
    paymentHistoryId: number;
    amount: number;
    status: number;
    createdDate: Date;
    paymentMethod: PaymentMethod;
    order: OrderDto;
  }
  
  interface PaymentMethod {
    paymentMethodId: number;
    methodName: string;
  }
  
  
  
  export default Payment;
  