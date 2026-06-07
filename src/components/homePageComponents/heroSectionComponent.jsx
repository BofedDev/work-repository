import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { API_BASE_URL } from '../../constants/API.js';

const HeroSectionComponent = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}products/10`)
            .then(res => res.json())
            .then(data => {
                setImage(data.thumbnail);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <CircularProgress sx={styles.loading} />;
    }

    return (
        <Box
            component="section"
            sx={{
                ...styles.hero,
                backgroundImage: `url(${image})`
            }}
        >
            <Box sx={styles.overlay} />

            <Container maxWidth="lg" sx={styles.container}>
                <Box sx={styles.content}>
                    <Typography variant="h1" sx={styles.mainTitle}>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </Typography>

                    <Typography variant="body1" sx={styles.description}>
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of style.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/category')}
                        sx={styles.shopButton}
                    >
                        Shop Now
                    </Button>

                    <Box sx={styles.stats}>
                        <Box sx={styles.statItem}>
                            <Typography variant="h3" sx={styles.statNumber}>200+</Typography>
                            <Typography variant="body2" sx={styles.statLabel}>Brands</Typography>
                        </Box>
                        <Box sx={styles.statItem}>
                            <Typography variant="h3" sx={styles.statNumber}>2,000+</Typography>
                            <Typography variant="body2" sx={styles.statLabel}>High-Quality Products</Typography>
                        </Box>
                        <Box sx={styles.statItem}>
                            <Typography variant="h3" sx={styles.statNumber}>30,000+</Typography>
                            <Typography variant="body2" sx={styles.statLabel}>Customers</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

//Styles
const styles = {
    hero: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        height: { xs: 'auto', md: '663px' },
        minHeight: { xs: '480px', md: '663px' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0,0,0,0.5)',
        zIndex: 1
    },

    container: {
        zIndex: 2,
        position: 'relative'
    },

    content: {
        maxWidth: { xs: '100%', md: '650px' },
        p: { xs: '24px 8px', md: 0 },
        textAlign: { xs: 'center', md: 'left' }
    },

    mainTitle: {
        fontWeight: 900,
        letterSpacing: { xs: '-1px', md: '-2px' },
        textTransform: 'uppercase',
        fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
        lineHeight: 1.1,
        mb: 2
    },

    description: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: { xs: '14px', md: '18px' },
        mb: { xs: 3, md: 5 },
        maxWidth: '550px',
        mx: { xs: 'auto', md: 0 }
    },

    shopButton: {
        bgcolor: '#fff',
        color: '#000',
        borderRadius: '50px',
        textTransform: 'none',
        fontSize: { xs: '14px', md: '16px' },
        fontWeight: 'bold',
        py: { xs: 1.5, md: 2 },
        px: { xs: 4, md: 6 },
        '&:hover': { bgcolor: '#e0e0e0' }
    },

    stats: {
        display: 'flex',
        gap: { xs: 4, md: 6 },
        mt: { xs: 4, md: 8 },
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', md: 'flex-start' }
    },

    statItem: {},

    statNumber: {
        fontWeight: 'bold',
        fontSize: { xs: '1.8rem', md: '3rem' }
    },

    statLabel: {
        color: 'rgba(255,255,255,0.7)'
    },

    loading: {
        display: 'block',
        m: '100px auto'
    }
};

export default HeroSectionComponent;