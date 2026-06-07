import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';

const DELIVERY_FEE = 15;
const DISCOUNT_PERCENT = 20;

const CartPageComponent = () => {
    const items = useSelector(state => state.cart?.items || []);
    const [promoCode, setPromoCode] = useState('');

    const subtotal = items.reduce(
        (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1), 0
    );
    const discount = subtotal * (DISCOUNT_PERCENT / 100);
    const total = subtotal - discount + DELIVERY_FEE;

    if (items.length === 0) return <EmptyCart />;

    return (
        <Box sx={styles.root}>
            <Typography variant="h4" fontWeight={900} sx={styles.title}>
                Your Cart ({items.length})
            </Typography>

            <Box sx={styles.layout}>
                <Box sx={styles.itemsBox}>
                    {items.map((item, index) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            showDivider={index < items.length - 1}
                        />
                    ))}
                </Box>

                <OrderSummary
                    subtotal={subtotal}
                    discount={discount}
                    total={total}
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                    DISCOUNT_PERCENT={DISCOUNT_PERCENT}
                    DELIVERY_FEE={DELIVERY_FEE}
                />
            </Box>
        </Box>
    );
};

export default CartPageComponent;

//Styles

const styles = {
    root: {
        maxWidth: 1400,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: 4,
    },
    title: {
        textTransform: 'uppercase',
        mb: 4,
    },
    layout: {
        display: 'flex',
        gap: 4,
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' },
    },
    itemsBox: {
        flex: 1,
        minWidth: 0,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '20px',
        p: 3,
    },
};