import React, { useEffect, useState, useMemo } from 'react';
import Container from '@mui/material/Container';

import { itemType, discountType } from '../../../types/api';
import { currencyTypes } from '../../../types/common';

const CURRENCY: Array<currencyTypes> = [
    { code: 'USD', simbol: '$', position: 'before' },
    { code: 'KRW', simbol: '원', position: 'last' },
];

const CartContainer = () => {
    const [bottomDisplay, isBottomDisplay] = useState<any>(true);
    const [discounts, setDiscounts] = useState<discountType[]>([]);
    const [items, setItem] = useState<Array<itemType>>([]);
    const [currencyInfo, setCurrencyInfo] = useState<any>(CURRENCY[0]);

    useEffect(() => {
        fetch('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData')
            .then(response => response.json())
            .then(json => {
                let currencyInfo = CURRENCY.find(i => i.code === json.currency_code);
                setCurrencyInfo(currencyInfo);

                let discountAry: Array<discountType> = Object.values(json.discounts);
                setDiscounts(discountAry);

                let itemAry: Array<itemType> = Object.values(json.items);
                setItem(itemAry);
            });
    }, []);

    return (
        <Container maxWidth={'md'}>
        </Container>
    );
};

export default CartContainer;
