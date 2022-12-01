import { currencyTypes } from '../types/common';

export const convertNumToPrice = (price: string | number | null | undefined) => {
    if (!price) {
        return 0;
    }

    const priceTxt = `${price}`;
    const len = priceTxt.length;

    if (len <= 3) {
        return priceTxt;
    }

    const unit = Math.floor(len / 3); // 금액을 3자리로 나누는 횟수
    const residue = len % 3; // 3자리를 못 채우는 나머지 수

    let output = priceTxt.slice(0, residue);

    for (let i = 0; i < unit; i++) {
        let start = 3 * i + residue;
        let end = start + 3;

        if (residue === 0 && i === 0) {
            // 자릿수가 3의 배수로 딱 맞아떨어지는 경우
            output = output + priceTxt.slice(start, end);
        } else {
            output = output + ',' + priceTxt.slice(start, end);
        }
    }
    return output;
};

export const convertAryToString = (array: string[]) => {
    let aryString = array.reduce((acc: string, item: string) => (acc += `${item}, `));
    aryString = aryString.slice(0, -2);
    return aryString;
};

export const getCurrencyText = (currency: currencyTypes, price: number): string => {
    let priceTxt = convertNumToPrice(price);
    return `${currency.position === 'before' ? currency.simbol : ' '}${priceTxt}${currency.position === 'last' ? currency.simbol : ''}`;
};
