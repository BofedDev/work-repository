import React from 'react';
import { Box, Grid, Typography, Chip, Stack, Divider } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';

const Row = ({ label, value }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.row}>
        <Typography variant="body2" sx={styles.rowLabel}>{label}</Typography>
        <Typography variant="body2" fontWeight={600} sx={styles.rowValue}>
            {value}
        </Typography>
    </Stack>
);

const ProductDetailsTab = ({ product }) => {
    if (!product) return null;

    return (
        <Box sx={styles.container}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={700} sx={styles.sectionTitle}>
                        Описание
                    </Typography>
                    <Typography variant="body1" sx={styles.description}>
                        {product.description}
                    </Typography>

                    {product.tags?.length > 0 && (
                        <>
                            <Typography variant="subtitle2" fontWeight={700} sx={styles.tagsTitle}>
                                Теги
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {product.tags.map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={styles.tag}
                                    />
                                ))}
                            </Stack>
                        </>
                    )}
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={700} sx={styles.sectionTitle}>
                        Характеристики
                    </Typography>
                    <Divider />

                    {product.brand && <Row label="Бренд" value={product.brand} />}
                    <Divider />
                    <Row label="Категория" value={product.category} />
                    <Divider />
                    <Row label="Наличие" value={product.availabilityStatus} />
                    <Divider />
                    <Row label="На складе" value={`${product.stock} шт.`} />
                    <Divider />
                    <Row label="Вес" value={`${product.weight} кг`} />

                    {product.dimensions && (
                        <>
                            <Divider />
                            <Row
                                label="Размеры (Д × Ш × В)"
                                value={`${product.dimensions.depth} × ${product.dimensions.width} × ${product.dimensions.height} см`}
                            />
                        </>
                    )}
                    <Divider />

                    <Stack spacing={1.5} sx={styles.infoStack}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <LocalShippingOutlinedIcon fontSize="small" />
                            <Typography variant="body2">{product.shippingInformation}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <VerifiedOutlinedIcon fontSize="small" />
                            <Typography variant="body2">{product.warrantyInformation}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <LoopOutlinedIcon fontSize="small" />
                            <Typography variant="body2">{product.returnPolicy}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

const styles = {
    container: {
        py: 4,
    },
    sectionTitle: {
        mb: 2,
    },
    description: {
        color: 'rgba(0,0,0,0.6)',
        lineHeight: 1.8,
        mb: 3,
    },
    tagsTitle: {
        mb: 1,
    },
    tag: {
        borderColor: 'rgba(0,0,0,0.15)',
        textTransform: 'capitalize',
    },
    row: {
        py: 1.5,
    },
    rowLabel: {
        color: 'rgba(0,0,0,0.5)',
        minWidth: 160,
    },
    rowValue: {
        textAlign: 'right',
    },
    infoStack: {
        mt: 3,
    },
};

export default ProductDetailsTab;