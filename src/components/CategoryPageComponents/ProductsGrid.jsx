import React from 'react';
import { Box, Grid, Typography, CircularProgress, Pagination } from '@mui/material';
import ProductCard from "@components/reusableComponents/ProductCard.jsx";

const ProductsGrid = ({products,loading,total,page,limit,onPageChange}) => {
    const totalPages = Math.ceil(total / limit);

    if (loading) {
        return (
            <Box sx={styles.loadingContainer}>
                <CircularProgress />
            </Box>
        );
    }

    if (products.length === 0) {
        return (
            <Typography sx={styles.emptyMessage}>
                No products found
            </Typography>
        );
    }

    return (
        <>
            <Grid container spacing={3} sx={styles.grid}>
                {products.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <ProductCard product={item} />
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box sx={styles.paginationContainer}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, val) => onPageChange(val)}
                        shape="rounded"
                        sx={styles.pagination}
                    />
                </Box>
            )}
        </>
    );
};

//Styles
const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        py: 10
    },

    emptyMessage: {
        textAlign: 'center',
        py: 10,
        color: 'rgba(0,0,0,0.4)'
    },


    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        mt: 6
    },

    pagination: {
        '& .MuiPaginationItem-root.Mui-selected': {
            bgcolor: 'black',
            color: 'white'
        }
    }
};

export default ProductsGrid;