export interface AddressFormData {
  addressId: number
    addressLine: string;
    district: string;
    city: string;
    default: boolean;
    user: {
      userId: number ;
      fullName: string ;
      email: string;
    phone: string;
    point: number;
    image: string;
    roleName: string;
    firstLogin: boolean;
    };
  }
  