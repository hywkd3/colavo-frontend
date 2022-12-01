import React, { useEffect, useState, useMemo } from 'react';
import { Divider, Container, Box } from '@mui/material';

import { itemType, discountType } from '../../../types/api';
import { currencyTypes } from '../../../types/common';
import { CFBottomButton } from '../../ui';
import AddButtonContainer from './AddButtonContainer';
import ItemListContainer from './ItemListContainer';

const CURRENCY: Array<currencyTypes> = [
    { code: 'USD', simbol: '$', position: 'before' },
    { code: 'KRW', simbol: '원', position: 'last' },
];

const CartContainer = () => {
    const [items, setItem] = useState<Array<itemType>>([]);
    const [discounts, setDiscounts] = useState<discountType[]>([]);
    const [currencyInfo, setCurrencyInfo] = useState<any>(CURRENCY[0]);

    const [curItems, setCurItems] = useState<itemType[]>([]);
    const [curDiscounts, setCurDiscounts] = useState<discountType[]>([]);

    useEffect(() => {
        fetch('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData')
            .then(response => response.json())
            .then(json => {
                let currencyInfo = CURRENCY.find(i => i.code === json.currency_code);
                setCurrencyInfo(currencyInfo);

                // 시술목록
                let itemAry: Array<itemType> = Object.values(json.items);
                setItem(itemAry);

                // 할인목록
                let discountAry: Array<discountType> = Object.values(json.discounts);
                setDiscounts(discountAry);
            });
    }, []);
    const existItem = useMemo(() => curItems.length !== 0, [curItems]);

    return (
        <Container maxWidth={'md'}>
            <AddButtonContainer
                currency={currencyInfo}
                itemList={items}
                discountList={discounts}
                curItems={curItems}
                curDiscounts={curDiscounts}
                setCurItems={setCurItems}
                setCurDiscounts={setCurDiscounts}
            />
            <Divider />
            <Box>
                <ItemListContainer currency={currencyInfo} itemList={curItems} discountList={curDiscounts} setItemList={setCurItems} setDiscountList={setCurDiscounts} existItem={existItem} />
            </Box>
            {curItems.length > 0 || curDiscounts.length > 0 ? <Divider /> : <></>}
            <Box>
                {existItem ? (
                    <>
                        <CFBottomButton text={'완료'} variant={'contained'} />
                    </>
                ) : (
                    <></>
                )}
            </Box>
        </Container>
    );
};

export default CartContainer;
