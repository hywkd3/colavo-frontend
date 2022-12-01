import React, { useState, useEffect } from 'react';
import { List, Container, Typography, Stack, Divider } from '@mui/material';

import { getCurrencyText } from '../../../utils/fommater';
import { itemType, discountType } from '../../../types/api';
import { currencyTypes } from '../../../types/common';
import CartItem from './renderItem/CartItem';
import DiscountItem from './renderItem/DiscountItem';

interface ItemListContainerProps {
    itemList: Array<itemType>;
    currency: currencyTypes;
    discountList: Array<discountType>;
    existItem: boolean;
    setItemList: React.Dispatch<React.SetStateAction<itemType[]>>;
    setDiscountList: React.Dispatch<React.SetStateAction<discountType[]>>;
}

const styles = {
    container: {
        width: '100%',
    },
    total_container: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        direction: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
};

const ItemListContainer = ({ itemList, currency, discountList, existItem, setItemList, setDiscountList }: ItemListContainerProps) => {
    const [totPrice, setTotPrice] = useState<number>(0);
    const [totDiscountPrice, setTotDiscountPrice] = useState<number>(0);

    useEffect(() => {
        let totPriceCalc = itemList.reduce((acc, item) => acc + item.price * item.count, 0);
        setTotPrice(totPriceCalc);

        let activeDiscounts = discountList.filter(discount => discount.isDiscount);
        let totDiscountPriceCalc = activeDiscounts.map(discount => discount.items.reduce((acc, item) => acc + item.price * item.count * discount.rate, 0)).reduce((acc, i) => acc + i, 0);
        setTotDiscountPrice(totDiscountPriceCalc);
    }, [itemList, discountList]);

    // const getCurrencyText = (price: number): string => {
    //     let priceTxt = convertNumToPrice(price);
    //     return `${currency.position === 'before' ? currency.simbol : ' '}${priceTxt}${currency.position === 'last' ? currency.simbol : ''}`;
    // };

    return (
        <>
            <Container sx={styles.container}>
                <List>
                    {itemList?.map((v, i) => {
                        return (
                            <CartItem
                                key={`cart-item-${i}`}
                                item={v}
                                idx={i}
                                itemList={itemList}
                                discountList={discountList}
                                currency={currency}
                                setItemList={setItemList}
                                setDiscountList={setDiscountList}
                            />
                        );
                    })}
                    {discountList?.map((v, i) => {
                        return (
                            <DiscountItem
                                key={`discount-item-${i}`}
                                discount={v}
                                idx={i}
                                itemList={itemList}
                                discountList={discountList}
                                currency={currency}
                                setItemList={setItemList}
                                setDiscountList={setDiscountList}
                            />
                        );
                    })}
                </List>
            </Container>
            <Container
                maxWidth={'md'}
                sx={[
                    styles.total_container,
                    {
                        height: `${existItem ? '15%' : '5%'}`,
                    },
                ]}
            >
                <Divider />
                <Stack sx={{ my: 1 }} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">합계:</Typography>
                    <Typography variant="h5">{`${getCurrencyText(currency, totPrice - totDiscountPrice)}`}</Typography>
                </Stack>
            </Container>
        </>
    );
};
export default ItemListContainer;
