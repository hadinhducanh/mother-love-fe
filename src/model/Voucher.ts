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
    quantityOfUser: number;
}

export interface VoucherObjbyID {
    customerVoucherId: number;
    assignedDate: string;
    usedDate: string | null;
    voucher: VoucherObj;
    user: {
        userId: number;
        fullName: string;
        email: string;
        phone: string;
        point: number;
        image: string;
        roleName: string;
        firstLogin: boolean;
    };
    used: boolean;
    quantity: number;
}
