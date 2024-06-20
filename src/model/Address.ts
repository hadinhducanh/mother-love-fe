import { User } from "./User";

export interface AddressObj{
  addressId: number;
  addressLine: string;
  district: string;
  city: string;
  user: User;
}
export interface AddressObjExtend extends AddressObj{
  isDefault: boolean; // Thêm thuộc tính này để xác định địa chỉ mặc định
}