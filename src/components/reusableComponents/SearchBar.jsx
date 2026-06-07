import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetProductsQuery } from '@store/shopApi';
import {TextField,Box,Paper,Typography,InputAdornment,CircularProgress} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { data, isLoading } = useGetProductsQuery(
        { search: searchTerm, limit: 8 },
        { skip: !searchTerm.trim() }
    );

    const products = data?.products || [];

    const handleProductClick = (product) => {
        setSearchTerm('');
        navigate(`/product/${product.id}`);
    };

    return (
        <Box sx={styles.root}>
            <TextField
                fullWidth
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={styles.textField}
            />

            {searchTerm && (
                <Paper elevation={4} sx={styles.dropdown}>
                    {isLoading ? (
                        <Box sx={styles.loaderBox}>
                            <CircularProgress size={30} />
                        </Box>
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <Box
                                key={product.id}
                                sx={styles.productRow}
                                onClick={() => handleProductClick(product)}
                            >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    style={styles.productImage}
                                />
                                <Box flexGrow={1}>
                                    <Typography variant="body1" fontWeight={500} noWrap>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {product.category}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" fontWeight={600}>
                                    ${product.price}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography sx={styles.emptyText}>
                            Ничего не найдено по запросу "{searchTerm}"
                        </Typography>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default SearchBar;

//Styles

const styles = {
    root: {
        position: 'relative',
        width: '100%',
        maxWidth: 600,
    },
    textField: {
        backgroundColor: '#f5f5f5',
        '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            paddingLeft: 2,
        },
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        mt: 1,
        maxHeight: 420,
        overflow: 'auto',
        zIndex: 1300,
        borderRadius: 3,
    },
    loaderBox: {
        display: 'flex',
        justifyContent: 'center',
        p: 4,
    },
    productRow: {
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#f8f9fa' },
    },
    productImage: {
        width: 50,
        height: 50,
        objectFit: 'contain',
        borderRadius: 4,
    },
    emptyText: {
        p: 4,
        textAlign: 'center',
        color: 'text.secondary',
    },
};