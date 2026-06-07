import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <Box sx={styles.root}>
            <Typography variant="h5" fontWeight={700} sx={styles.title}>
                Your cart is empty
            </Typography>
            <Button variant="contained" onClick={() => navigate('/category')} sx={styles.btn}>
                Continue Shopping
            </Button>
        </Box>
    );
};

export default EmptyCart;

//Styles

const styles = {
    root: {
        textAlign: 'center',
        py: 10,
    },
    title: {
        mb: 2,
    },
    btn: {
        bgcolor: 'black',
        borderRadius: '62px',
        textTransform: 'none',
        px: 4,
        '&:hover': { bgcolor: '#333' },
    },
};