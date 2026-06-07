import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    if (!product) return null;

    const oldPrice = Math.round(product.price / (1 - product.discountPercentage / 100));

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <Box sx={productCardStyles.root} onClick={handleClick}>
            <Box sx={productCardStyles.imageContainer}>
                <Box
                    component="img"
                    src={product.thumbnail}
                    alt={product.title}
                    sx={productCardStyles.image}
                />
            </Box>

            <Typography variant="h6" sx={productCardStyles.title}>
                {product.title}
            </Typography>

            <Box sx={productCardStyles.ratingContainer}>
                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" sx={productCardStyles.ratingText}>
                    {product.rating}/5
                </Typography>
            </Box>

            <Box sx={productCardStyles.priceContainer}>
                <Typography variant="h6" sx={productCardStyles.currentPrice}>
                    ${product.price}
                </Typography>

                {product.discountPercentage > 0 && (
                    <>
                        <Typography variant="h6" sx={productCardStyles.oldPrice}>
                            ${oldPrice}
                        </Typography>
                        <Box sx={productCardStyles.discountBadge}>
                            -{Math.round(product.discountPercentage)}%
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

//Styles
const productCardStyles = {
    root: {
        width: '100%',
        mb: 4,
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'translateY(-8px)'
        }
    },

    imageContainer: {
        width: '100%',
        aspectRatio: '1/1',
        bgcolor: '#F0EEED',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        mb: 2
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        p: 2
    },

    title: {
        fontWeight: 'bold',
        fontSize: '1rem',
        mb: 0.5,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 1
    },

    ratingText: {
        color: 'text.secondary'
    },

    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
    },

    currentPrice: {
        fontWeight: 'bold'
    },

    oldPrice: {
        color: 'rgba(0,0,0,0.4)',
        textDecoration: 'line-through'
    },

    discountBadge: {
        bgcolor: 'rgba(255, 51, 51, 0.1)',
        color: '#FF3333',
        px: 1.5,
        py: 0.5,
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 'bold'
    }
};

export default ProductCard;