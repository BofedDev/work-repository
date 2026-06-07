import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Button, Rating,
    Stack, Divider, Tabs, Tab, useMediaQuery
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { API_BASE_URL } from '../../constants/API.js';
import ProductDetailsTab from './ProductDetailsTab.jsx';

const MONTHS = ['January','February','March','April','May','June','July',
    'August','September','October','November','December'];

const fakeDate = (i) => {
    const d = new Date(2023, 7, 14 + i);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const ReviewCard = ({ name, comment, rating, date }) => (
    <Box sx={styles.reviewCard}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Rating value={rating} readOnly precision={0.5} sx={styles.rating} />
            <Box sx={styles.reviewMenu}>···</Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
            <Typography fontWeight={700}>{name}</Typography>
            <CheckCircleIcon sx={styles.verifiedIcon} />
        </Stack>
        <Typography variant="body2" sx={styles.reviewComment}>
            "{comment}"
        </Typography>
        <Typography variant="body2" sx={styles.reviewDate}>
            Posted on {date}
        </Typography>
    </Box>
);

const ProductReviews = ({ product }) => {
    const isMobile = useMediaQuery('(max-width:900px)');

    const initialVisible = isMobile ? 3 : 6;
    const loadMoreCount = isMobile ? 3 : 6;

    const [tab, setTab] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [visible, setVisible] = useState(initialVisible);

    useEffect(() => {
        setVisible(initialVisible);
    }, [isMobile]);

    useEffect(() => {
        fetch(`${API_BASE_URL}comments?limit=20`)
            .then(res => res.json())
            .then(data => setReviews(data.comments))
            .catch(err => console.log(err));
    }, []);

    return (
        <Box sx={styles.root}>
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                centered
                TabIndicatorProps={{ style: styles.tabIndicator }}
                sx={styles.tabs}
            >
                {['Product Details', 'Rating & Reviews', 'FAQs'].map((label, i) => (
                    <Tab
                        key={i}
                        label={label}
                        sx={styles.tab(tab, i)}
                    />
                ))}
            </Tabs>

            {tab === 0 && <ProductDetailsTab product={product} />}

            {tab === 1 && (
                <>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.reviewsHeader}>
                        <Typography variant="h6" fontWeight={700}>
                            All Reviews{' '}
                            <Typography component="span" sx={styles.reviewsCount}>
                                ({reviews.length})
                            </Typography>
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={styles.filterBox}>
                                <TuneIcon sx={styles.filterIcon} />
                                <Typography variant="body2">Latest</Typography>
                            </Box>
                            <Button variant="contained" sx={styles.writeReviewBtn}>
                                Write a Review
                            </Button>
                        </Stack>
                    </Stack>

                    <Grid container spacing={3}>
                        {reviews.slice(0, visible).map((item, i) => (
                            <Grid item xs={12} sm={6} key={item.id}>
                                <ReviewCard
                                    name={item.user.fullName}
                                    comment={item.body}
                                    rating={3.5 + (i % 3) * 0.5}
                                    date={fakeDate(i)}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={styles.divider} />

                    {visible < reviews.length && (
                        <Box sx={styles.loadMoreWrapper}>
                            <Button
                                variant="outlined"
                                onClick={() => setVisible(v => v + loadMoreCount)}
                                sx={styles.loadMoreBtn}
                            >
                                Load More Reviews
                            </Button>
                        </Box>
                    )}
                </>
            )}

            {tab === 2 && (
                <Typography sx={styles.faqsPlaceholder}>
                    FAQs coming soon
                </Typography>
            )}
        </Box>
    );
};

export default ProductReviews;

//Styles

const styles = {
    root: {
        mt: 4,
    },

    tabIndicator: {
        backgroundColor: 'black',
        height: 2,
    },
    tabs: {
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        mb: 4,
    },
    tab: (tab, i) => ({
        textTransform: 'none',
        fontWeight: tab === i ? 700 : 400,
        color: tab === i ? 'black' : 'rgba(0,0,0,0.5)',
        fontSize: '1rem',
    }),

    reviewsHeader: {
        mb: 3,
    },
    reviewsCount: {
        color: 'rgba(0,0,0,0.4)',
        fontWeight: 400,
    },
    filterBox: {
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '62px',
        px: 2,
        py: 0.75,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
    },
    filterIcon: {
        fontSize: 18,
    },
    writeReviewBtn: {
        bgcolor: 'black',
        color: 'white',
        borderRadius: '62px',
        textTransform: 'none',
        px: 3,
        '&:hover': { bgcolor: '#333' },
    },

    divider: {
        mt: 4,
    },
    loadMoreWrapper: {
        textAlign: 'center',
        mt: 3,
    },
    loadMoreBtn: {
        borderRadius: '62px',
        textTransform: 'none',
        color: 'black',
        borderColor: 'rgba(0,0,0,0.2)',
        px: 5,
    },

    faqsPlaceholder: {
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        py: 6,
    },

    reviewCard: {
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '20px',
        p: 3,
    },
    rating: {
        color: '#FFC633',
        mb: 1.5,
    },
    reviewMenu: {
        color: 'rgba(0,0,0,0.3)',
        cursor: 'pointer',
        fontSize: '1.2rem',
        letterSpacing: 2,
    },
    verifiedIcon: {
        color: '#01AB31',
        fontSize: 18,
    },
    reviewComment: {
        color: 'rgba(0,0,0,0.6)',
        lineHeight: 1.6,
        mb: 2,
    },
    reviewDate: {
        color: 'rgba(0,0,0,0.4)',
    },
};