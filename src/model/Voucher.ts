import { User } from './User';

export interface VoucherObj {
    voucherId: number;
    voucherCode: string;
    voucherName: string;
    quantity: number;
    discount: number;
    minOrderAmount: number;
    startDate: string;
    endDate: string;
    status: boolean;
    quantityUse: number;
}

export interface VoucherObjbyID {
    customerVoucherId: number;
    assignedDate: string;
    usedDate: string | null;
    voucher: VoucherObj;
    user: User;
    isUsed: boolean;
    quantityAvailable: number;
}
