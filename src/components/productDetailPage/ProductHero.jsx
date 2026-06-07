import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addToCart } from '@store/cartSlice';
import {Box,Grid,Typography,Rating,Button,Stack,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductHero = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <Typography sx={styles.loading}>Loading product...</Typography>;
    }

    const discountedPrice = (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail || product.images?.[0],
            discountPercentage: product.discountPercentage || 0,
            quantity: quantity
        }));
        navigate('/cart');
    };

    return (
        <Grid container spacing={2} sx={styles.mainGrid}>

            <Grid item xs={1}>
                <Stack spacing={1.5}>
                    {product.images?.slice(0, 3).map((img, i) => (
                        <Box
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            sx={selectedImage === i ? styles.thumbnailActive : styles.thumbnail}
                        >
                            <Box
                                component="img"
                                src={img}
                                alt=""
                                sx={styles.thumbnailImage}
                            />
                        </Box>
                    ))}
                </Stack>
            </Grid>

            <Grid item xs={11} sm={4}>
                <Box sx={styles.mainImageContainer}>
                    <Box
                        component="img"
                        src={product.images?.[selectedImage] || product.thumbnail}
                        alt={product.title}
                        sx={styles.mainImage}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} sm={7}>
                <Stack spacing={2.5} sx={styles.infoStack}>

                    <Typography variant="h4" fontWeight={900} sx={styles.title}>
                        {product.title}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small" sx={styles.rating} />
                        <Typography variant="body2" sx={styles.ratingText}>
                            {product.rating}/5
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h4" fontWeight={900} sx={styles.price}>
                            ${discountedPrice}
                        </Typography>
                        {product.discountPercentage > 0 && (
                            <>
                                <Typography variant="h5" sx={styles.originalPrice}>
                                    ${product.price}
                                </Typography>
                                <Box sx={styles.discountBadge}>
                                    -{Math.round(product.discountPercentage)}%
                                </Box>
                            </>
                        )}
                    </Stack>

                    <Typography variant="body2" sx={styles.description}>
                        {product.description}
                    </Typography>

                    <Box sx={styles.dividerBox}>
                        <Stack direction="row" spacing={2} alignItems="center">

                            <Stack direction="row" alignItems="center" sx={styles.quantityContainer}>
                                <IconButton
                                    size="small"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={styles.quantityText}>
                                    {quantity}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => setQuantity(q => Math.min(product.stock || 99, q + 1))}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                            <Button
                                variant="contained"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                fullWidth
                                onClick={handleAddToCart}
                                sx={styles.addToCartButton}
                            >
                                Add to Cart
                            </Button>

                            <Button
                                variant="outlined"
                                sx={styles.favoriteButton}
                            >
                                <FavoriteBorderIcon />
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
};

const styles = {
    mainGrid: {
        py: 6,
    },
    loading: {
        py: 10,
        textAlign: 'center',
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: '12px',
        border: '2px solid rgba(0,0,0,0.1)',
        bgcolor: '#F0EEED',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnailActive: {
        width: 70,
        height: 70,
        borderRadius: '12px',
        border: '2px solid black',
        bgcolor: '#F0EEED',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        p: 0.5
    },
    mainImageContainer: {
        bgcolor: '#F0EEED',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 420,
        overflow: 'hidden'
    },
    mainImage: {
        maxHeight: 380,
        maxWidth: '100%',
        objectFit: 'contain',
        p: 3
    },
    infoStack: {
        pt: 1,
    },
    title: {
        textTransform: 'uppercase',
        lineHeight: 1.2,
    },
    rating: {
        color: '#FFC633',
    },
    ratingText: {
        color: 'rgba(0,0,0,0.5)',
    },
    price: {},
    originalPrice: {
        color: 'rgba(0,0,0,0.35)',
        textDecoration: 'line-through',
    },
    discountBadge: {
        bgcolor: 'rgba(255,51,51,0.1)',
        color: '#FF3333',
        px: 1.5,
        py: 0.5,
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 700
    },
    description: {
        color: 'rgba(0,0,0,0.6)',
        lineHeight: 1.7,
    },
    dividerBox: {
        borderTop: '1px solid rgba(0,0,0,0.1)',
        pt: 2.5,
    },
    quantityContainer: {
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '62px',
        px: 1,
        flexShrink: 0
    },
    quantityText: {
        px: 2,
        fontWeight: 600,
        minWidth: 20,
        textAlign: 'center'
    },
    addToCartButton: {
        bgcolor: 'black',
        color: 'white',
        borderRadius: '62px',
        py: 1.5,
        textTransform: 'none',
        fontSize: '1rem',
        '&:hover': { bgcolor: '#333' }
    },
    favoriteButton: {
        borderRadius: '62px',
        minWidth: 52,
        px: 0,
        borderColor: 'rgba(0,0,0,0.2)',
        color: 'black',
        flexShrink: 0,
        '&:hover': { borderColor: 'black' }
    },
};

export default ProductHero;