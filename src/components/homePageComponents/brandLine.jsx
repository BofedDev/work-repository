import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { API_BASE_URL } from '../../constants/API.js';

const BrandsBar = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}products?limit=8&skip=0`)
            .then(res => res.json())
            .then(data => {
                const limitedProducts = (data.products || []).slice(0, 5);
                setProducts(limitedProducts);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box sx={styles.loaderWrapper}>
                <CircularProgress sx={styles.loader} />
            </Box>
        );
    }

    return (
        <Box sx={styles.wrapper}>
            <Container maxWidth="lg" disableGutters>
                <Box sx={styles.brandsContainer}>
                    {products.map((product) => (
                        <Box key={product.id} sx={styles.brandItem}>
                            <Box
                                component="img"
                                src={product.thumbnail}
                                alt={product.title}
                                sx={styles.brandImage}
                            />
                            <Typography sx={styles.brandText}>
                                {product.brand || product.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

const styles = {
    wrapper: {
        bgcolor: '#000',
        py: { xs: 3, md: 5 },
    },
    loaderWrapper: {
        bgcolor: '#000',
        py: { xs: 4, md: 5 },
        textAlign: 'center',
    },
    loader: {
        color: '#fff',
    },
    brandsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3, md: 0 },
        py: { xs: 2, md: 3 },

        '@media (max-width: 899px)': {
            '& > *:nth-child(1), & > *:nth-child(2), & > *:nth-child(3)': {
                flexBasis: '30%',
                maxWidth: '30%',
            },
            '& > *:nth-child(4), & > *:nth-child(5)': {
                flexBasis: '30%',
                maxWidth: '30%',
            },
            justifyContent: 'center',
        },

        '@media (min-width: 900px)': {
            flexWrap: 'nowrap',
            justifyContent: 'center',
            gap: { xs: 4, sm: 6, md: 8 },
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        },
    },
    brandItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: '0 0 auto',
    },
    brandImage: {
        width: '100%',
        maxWidth: { xs: 85, sm: 95, md: 110 },
        height: { xs: 55, sm: 70, md: 85 },
        objectFit: 'contain',
        filter: 'brightness(0.9)',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.08)',
        },
    },
    brandText: {
        color: '#fff',
        fontSize: { xs: '0.72rem', sm: '0.8rem', md: '0.85rem' },
        mt: 1.5,
        opacity: 0.9,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

export default BrandsBar;