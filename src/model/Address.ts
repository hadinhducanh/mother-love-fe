import { User } from "./User";

export interface AddressObj{
  addressId: number;
  addressLine: string;
  district: string;
  city: string;
  user?: User;
  default: boolean;
}

export interface ProvinceObj{
    ProvinceID: number;
    ProvinceName: string;
    CountryID: number;
    Code: string;
    NameExtension: string[];
    IsEnable: number;
    RegionID: number;
    RegionCPN: number;
    UpdatedBy: number;
    CreatedAt: string;
    UpdatedAt: string;
    CanUpdateCOD: boolean;
    Status: number;
    UpdatedIP: string;
    UpdatedEmployee: number;
    UpdatedSource: string;
    UpdatedDate: string;
}

export interface District {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  IsEnable: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: {
    From: string | null;
    To: string | null;
    Return: string | null;
  };
  WhiteListDistrict: {
    From: string | null;
    To: string | null;
  };
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string | null;
  UpdatedDate: string;
}