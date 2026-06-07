import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Typography, Card, CardActionArea, CircularProgress } from '@mui/material';
import { API_BASE_URL } from '../../constants/API.js';

const STYLE_TO_CATEGORY = {
    Casual: 'tops',
    Formal: 'mens-shirts',
    Party: 'womens-dresses',
    Gym: 'sports-accessories',
};

const BrowseByStyle = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}products?limit=4&skip=10`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || products.length < 4) {
        return (
            <Box sx={styles.loadingContainer}>
                <CircularProgress />
            </Box>
        );
    }

    const config = [
        { title: 'Casual', width: '35%', img: products[0].thumbnail },
        { title: 'Formal', width: '62%', img: products[1].thumbnail },
        { title: 'Party', width: '62%', img: products[2].thumbnail },
        { title: 'Gym', width: '35%', img: products[3].thumbnail },
    ];

    const handleClick = (title) => {
        const category = STYLE_TO_CATEGORY[title];
        navigate(category ? `/category/${category}` : '/category');
    };

    return (
        <Container maxWidth="lg" sx={styles.mainContainer}>
            <Box sx={styles.sectionWrapper}>
                <Typography variant="h2" sx={styles.title}>
                    Browse by dress style
                </Typography>

                {/* Mobile Version */}
                <Box sx={styles.mobileGrid}>
                    {config.map((item, idx) => (
                        <Card key={idx} sx={styles.mobileCard}>
                            <CardActionArea sx={styles.cardActionArea} onClick={() => handleClick(item.title)}>
                                <Typography variant="h6" sx={styles.mobileLabel}>
                                    {item.title}
                                </Typography>
                                <Box
                                    component="img"
                                    src={item.img}
                                    sx={styles.image}
                                />
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>

                {/* Desktop Version */}
                <Box sx={styles.desktopGrid}>
                    {config.map((item, idx) => (
                        <Card key={idx} sx={styles.desktopCard(item.width)}>
                            <CardActionArea sx={styles.cardActionArea} onClick={() => handleClick(item.title)}>
                                <Typography variant="h4" sx={styles.desktopLabel}>
                                    {item.title}
                                </Typography>
                                <Box
                                    component="img"
                                    src={item.img}
                                    sx={styles.image}
                                />
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

//Styles
const styles = {
    mainContainer: {
        my: { xs: 5, md: 10 }
    },

    sectionWrapper: {
        bgcolor: '#F0F0F0',
        borderRadius: { xs: '20px', md: '40px' },
        p: { xs: 3, md: 6 },
        textAlign: 'center'
    },

    title: {
        fontWeight: 900,
        mb: { xs: 3, md: 6 },
        textTransform: 'uppercase',
        fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
    },

    loadingContainer: {
        py: 10,
        textAlign: 'center'
    },

    //Mobile
    mobileGrid: {
        display: { xs: 'grid', md: 'none' },
        gridTemplateColumns: '1fr',
        gap: '12px',
    },

    mobileCard: {
        height: '140px',
        borderRadius: '16px',
        boxShadow: 'none',
        position: 'relative'
    },

    mobileLabel: {
        position: 'absolute',
        top: 12,
        left: 12,
        fontWeight: 'bold',
        zIndex: 2,
        fontSize: '1rem'
    },

    //Desktop
    desktopGrid: {
        display: { xs: 'none', md: 'flex' },
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
    },

    desktopCard: (width) => ({
        width: `calc(${width} - 10px)`,
        height: '289px',
        borderRadius: '20px',
        boxShadow: 'none',
        position: 'relative'
    }),

    desktopLabel: {
        position: 'absolute',
        top: 25,
        left: 25,
        fontWeight: 'bold',
        zIndex: 2
    },

    cardActionArea: {
        height: '100%'
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
};

export default BrowseByStyle;