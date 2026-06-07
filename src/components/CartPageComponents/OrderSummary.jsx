import React from 'react';
import { Box, Typography, Stack, Divider, TextField, InputAdornment, Button } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const OrderSummary = ({
                          subtotal,
                          discount,
                          total,
                          promoCode,
                          setPromoCode,
                          DISCOUNT_PERCENT = 20,
                          DELIVERY_FEE = 15
                      }) => {
    return (
        <Box sx={styles.root}>
            <Typography variant="h6" fontWeight={700} sx={styles.title}>
                Order Summary
            </Typography>

            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={styles.label}>Subtotal</Typography>
                    <Typography fontWeight={600}>${subtotal.toFixed(2)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={styles.label}>
                        Discount ({DISCOUNT_PERCENT}%)
                    </Typography>
                    <Typography fontWeight={600} sx={styles.discount}>
                        -${discount.toFixed(2)}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={styles.label}>Delivery Fee</Typography>
                    <Typography fontWeight={600}>${DELIVERY_FEE}</Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={styles.totalLabel}>Total</Typography>
                    <Typography sx={styles.totalLabel}>${total.toFixed(2)}</Typography>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={1} sx={styles.promoContainer}>
                <TextField
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Add promo code"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocalOfferOutlinedIcon fontSize="small" sx={styles.promoIcon} />
                            </InputAdornment>
                        ),
                        sx: styles.promoInput
                    }}
                    sx={styles.promoTextField}
                />
                <Button
                    variant="outlined"
                    sx={styles.applyButton}
                >
                    Apply
                </Button>
            </Stack>

            <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={styles.checkoutButton}
            >
                Go to Checkout
            </Button>
        </Box>
    );
};

// Styles
const styles = {
    root: {
        width: { xs: '100%', md: 380 },
        flexShrink: 0,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '20px',
        p: 3
    },
    title: {
        mb: 3
    },
    label: {
        color: 'rgba(0,0,0,0.6)'
    },
    discount: {
        color: '#FF3333'
    },
    totalLabel: {
        fontWeight: 700,
        fontSize: '1.1rem'
    },
    promoContainer: {
        mt: 3
    },
    promoInput: {
        borderRadius: '62px',
        bgcolor: '#F0EEED'
    },
    promoTextField: {
        '& fieldset': { border: 'none' }
    },
    promoIcon: {
        color: 'rgba(0,0,0,0.4)'
    },
    applyButton: {
        borderRadius: '62px',
        textTransform: 'none',
        color: 'black',
        borderColor: 'rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
        px: 3,
        '&:hover': { borderColor: 'black' }
    },
    checkoutButton: {
        mt: 3,
        bgcolor: 'black',
        color: 'white',
        borderRadius: '62px',
        py: 1.5,
        textTransform: 'none',
        fontSize: '1rem',
        '&:hover': { bgcolor: '#333' }
    }
};

export default OrderSummary;