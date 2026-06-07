import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReviewCard from './ReviewCard.jsx';

const HappyCustomers = () => {
    const [comments, setComments] = useState([]);
    const scrollRef = useRef(null);
    const isDesktop = useMediaQuery('(min-width:900px)');

    useEffect(() => {
        fetch('https://dummyjson.com/comments?limit=10')
            .then(res => res.json())
            .then(data => setComments(data.comments))
            .catch(err => console.log(err));
    }, []);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = isDesktop ? 350 : scrollRef.current.offsetWidth;
        const scrollTo = direction === 'left'
            ? scrollRef.current.scrollLeft - scrollAmount
            : scrollRef.current.scrollLeft + scrollAmount;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    };

    return (
        <Box sx={styles.root}>
            <Container maxWidth="lg">
                <Box sx={styles.header}>
                    <Typography variant="h3" sx={styles.title}>
                        OUR HAPPY CUSTOMERS
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => scroll('left')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton onClick={() => scroll('right')}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Stack>
                </Box>

                <Box ref={scrollRef} sx={styles.slider}>
                    {comments.map((item) => (
                        <Box key={item.id} sx={styles.slide}>
                            <ReviewCard
                                name={item.user.fullName}
                                comment={item.body}
                                rating={3.5}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default HappyCustomers;

//Styles

const styles = {
    root: {
        py: 8,
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
    },
    title: {
        fontWeight: 900,
        textTransform: 'uppercase',
    },
    slider: {
        display: 'flex',
        gap: 3,
        overflowX: 'auto',
        pb: 2,
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': { display: 'none' },
    },
    slide: {
        flex: '0 0 auto',
        width: { xs: '100%', md: 350 },
        scrollSnapAlign: 'start',
    },
};