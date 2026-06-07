import React from 'react';
import { Stack, Typography, Select, MenuItem } from '@mui/material';

const ProductsHeader = ({title,total,shown,sortBy,order,onSortChange,filterButton}) => {
    const sortValue = !sortBy ? 'default'
        : sortBy === 'price' && order === 'asc' ? 'price-asc'
            : sortBy === 'price' && order === 'desc' ? 'price-desc'
                : 'rating';

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.header}>
            <Typography
                variant="h5"
                fontWeight={700}
                sx={styles.title}
            >
                {title}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2" sx={styles.showingText}>
                    Showing {shown} of {total}
                </Typography>

                <Typography variant="body2" sx={styles.sortLabel}>
                    Sort by:
                </Typography>

                <Select
                    value={sortValue}
                    onChange={e => onSortChange(e.target.value)}
                    size="small"
                    sx={styles.select}
                >
                    <MenuItem value="default">Most Popular</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Top Rated</MenuItem>
                </Select>

                {filterButton}
            </Stack>
        </Stack>
    );
};

//Styles
const styles = {
    header: {
        mb: 3
    },

    title: {
        textTransform: 'capitalize'
    },

    showingText: {
        color: 'rgba(0,0,0,0.5)'
    },


    select: {
        borderRadius: '8px',
        fontSize: '0.875rem'
    }
};

export default ProductsHeader;