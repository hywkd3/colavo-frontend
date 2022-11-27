export interface requestAssignCalcDataResType {
    items: string;
    discounts: string;
    currency_code: string;
}

export interface discountType {
    name: string;
    rate: number;
}

export interface itemType {
    count: number;
    name: string;
    price: number;
}
