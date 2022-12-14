export interface requestAssignCalcDataResType {
    items: string;
    discounts: string;
    currency_code: string;
}

export interface discountType {
    id: string;
    name: string;
    rate: number;
    items: Array<itemType>;
    isDiscount?: boolean;
}

export interface itemType {
    id: string;
    count: number;
    name: string;
    price: number;
}
