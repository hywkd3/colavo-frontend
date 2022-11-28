import React, { useEffect, useState, useMemo } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import { itemType, discountType } from '../../../types/api';
import { currencyTypes } from '../../../types/common';
import { CFIconLabelButton, CFBottomButton } from '../../ui';
import AddButtonContainer from './AddButtonContainer';
import ItemListContainer from './ItemListContainer';

const styles = {
    container: {
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'black',
        width: '100%',
    },
};

const CURRENCY: Array<currencyTypes> = [
    { code: 'USD', simbol: '$', position: 'before' },
    { code: 'KRW', simbol: '원', position: 'last' },
];

const CartContainer = () => {
    const [bottomDisplay, isBottomDisplay] = useState<any>(true);
    const [discounts, setDiscounts] = useState<discountType[]>([]);
    const [items, setItem] = useState<Array<itemType>>([]);
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
            <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={styles.container}>
                <AddButtonContainer itemList={items} discountList={discounts} curItems={curItems} curDiscounts={curDiscounts} setCurItems={setCurItems} setCurDiscounts={setCurDiscounts} />
                <Divider />
                <ItemListContainer itemList={curItems} currency={currencyInfo} discountList={curDiscounts} setItemList={setCurItems} setDiscountList={setCurDiscounts} />
                <Divider />
                {existItem ? <CFBottomButton text={'완료'} variant={'contained'} /> : <></>}
            </Grid>
        </Container>
    );
};

export default CartContainer;
