export interface AddressFormData {
    addressLine: string;
    district: string;
    city: string;
    default: boolean;
    user: {
      userId: number | null;
    };
  }
  