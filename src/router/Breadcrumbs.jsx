import React from 'react';
import { Link, useLocation } from 'react-router';
import { Box, Typography, Container } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const LABELS = {
    'category': 'Shop',
    'cart': 'Cart',
    'about': 'About',
    'product': 'Product',
};

// Куда ведёт клик на сегмент (если отличается от реального пути)
const REDIRECT = {
    'product': '/category',
};

const Breadcrumbs = () => {
    const location = useLocation();

    const segments = location.pathname.split('/').filter(Boolean);

    const crumbs = [
        { label: 'Home', path: '/' },
        ...segments.map((seg, i) => {
            const realPath = '/' + segments.slice(0, i + 1).join('/');
            const path = REDIRECT[seg] ?? realPath;
            const label = LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
            return { label, path };
        }),
    ];

    if (crumbs.length <= 1) return null;

    return (
        <Box sx={styles.wrapper}>
            <Container maxWidth="xl">
                <Box sx={styles.root}>
                    {crumbs.map((crumb, i) => {
                        const isLast = i === crumbs.length - 1;
                        return (
                            <Box key={i} sx={styles.item}>
                                {isLast ? (
                                    <Typography sx={styles.current}>{crumb.label}</Typography>
                                ) : (
                                    <Link to={crumb.path} style={styles.link}>
                                        {crumb.label}
                                    </Link>
                                )}
                                {!isLast && <NavigateNextIcon sx={styles.separator} />}
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
};

export default Breadcrumbs;

//Styles

const styles = {
    wrapper: {
        borderBottom: '1px solid rgba(0,0,0,0.06)',
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        py: 1.5,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        color: 'rgba(0,0,0,0.5)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        transition: 'color 0.2s',
    },
    current: {
        fontSize: '0.875rem',
        fontWeight: 700,
        color: 'black',
    },
    separator: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.3)',
        mx: 0.5,
    },
};