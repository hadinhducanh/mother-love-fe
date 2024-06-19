import { User } from "./User";

export interface AddressObj{
  addressId: number;
  addressLine: string;
  district: string;
  city: string;
  user: User;
}