import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {Container,Typography,Box,Button,Divider,CircularProgress,useMediaQuery} from '@mui/material';

import { API_BASE_URL } from '../../constants/API.js';
import ProductCard from './ProductCard.jsx';

const ProductSection = ({ title, category = 'mens-shirts', skip = 0 }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width:900px)');

    const sliderRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        fetch(`${API_BASE_URL}products/category/${category}?limit=4&skip=${skip}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.products) setProducts(data.products);
            })
            .catch(err => console.error("Ошибка при загрузке:", err))
            .finally(() => setLoading(false));
    }, [category, skip]);

    const onMouseDown = (e) => {
        if (isDesktop) return;
        isDown.current = true;
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft.current = sliderRef.current.scrollLeft;
    };

    const onMouseLeave = () => (isDown.current = false);
    const onMouseUp = () => (isDown.current = false);

    const onMouseMove = (e) => {
        if (isDesktop || !isDown.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        sliderRef.current.scrollLeft = scrollLeft.current - walk;
    };

    if (loading) {
        return (
            <Box sx={styles.loading}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={styles.container}>
            <Typography variant="h2" sx={styles.title}>
                {title}
            </Typography>

            {!isDesktop && (
                <Box
                    ref={sliderRef}
                    sx={styles.slider}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    {products.map((item) => (
                        <Box key={item.id} sx={styles.slideItem}>
                            <ProductCard product={item} />
                        </Box>
                    ))}
                </Box>
            )}

            {isDesktop && (
                <Box sx={styles.grid}>
                    {products.map((item) => (
                        <Box key={item.id} sx={styles.gridItem}>
                            <ProductCard product={item} />
                        </Box>
                    ))}
                </Box>
            )}

            <Box sx={styles.buttonContainer}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(`/category/${category}`)}
                    sx={styles.viewAllButton}
                >
                    View All
                </Button>
            </Box>

            <Divider sx={styles.divider} />
        </Container>
    );
};

const styles = {
    container: {
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
    },

    loading: {
        display: 'flex',
        justifyContent: 'center',
        py: 10,
    },

    title: {
        textAlign: 'center',
        fontWeight: 900,
        mb: 6,
        textTransform: 'uppercase',
        fontSize: { xs: '2rem', md: '3rem' },
    },

    //mobile
    slider: {
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        cursor: 'grab',
        userSelect: 'none',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    slideItem: {
        minWidth: '50%',
        flexShrink: 0,
    },

    //desktop
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 3,
    },

    gridItem: {
        width: '100%',
    },

    buttonContainer: {
        textAlign: 'center',
        mt: 6,
    },

    viewAllButton: {
        borderRadius: '62px',
        px: { xs: 6, md: 10 },
        py: 1.5,
        color: 'black',
        borderColor: 'rgba(0,0,0,0.1)',
        textTransform: 'none',
        fontSize: '1rem',
        '&:hover': {
            borderColor: 'black',
            backgroundColor: 'rgba(0,0,0,0.05)',
        },
    },

    divider: {
        mt: 8,
        borderColor: 'rgba(0,0,0,0.1)',
    },
};

export default ProductSection;