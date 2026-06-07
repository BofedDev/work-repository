import React from 'react';
import { useNavigate, useParams } from 'react-router';
import {Box, Stack, Typography, Slider, Checkbox,FormControlLabel, Button, Divider, Chip} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FilterSection from './FilterSection.jsx';

const RATINGS = [5, 4, 3, 2, 1];

const FilterSidebar = ({
                           categories,
                           priceRange,
                           setPriceRange,
                           selectedRating,
                           setSelectedRating,
                           onApply
                       }) => {
    const navigate = useNavigate();
    const { category } = useParams();

    return (
        <Box sx={styles.root}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={styles.header}>
                <Typography variant="h6" fontWeight={700}>Filters</Typography>
                <TuneIcon />
            </Stack>
            <Divider sx={styles.divider} />

            <FilterSection title="Category">
                <Box sx={styles.categoryListContainer}>
                    <Stack spacing={0.5}>
                        <Chip
                            label="All"
                            onClick={() => navigate('/category')}
                            size="small"
                            sx={styles.categoryChip(!category)}
                        />
                        {categories.map(cat => (
                            <Chip
                                key={cat}
                                label={cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                onClick={() => navigate(`/category/${cat}`)}
                                size="small"
                                sx={styles.categoryChip(category === cat)}
                            />
                        ))}
                    </Stack>
                </Box>
            </FilterSection>

            <FilterSection title="Price">
                <Box sx={styles.priceContainer}>
                    <Slider
                        key={`${priceRange[0]}-${priceRange[1]}`}
                        value={priceRange}
                        onChange={(_, val) => setPriceRange(val)}
                        min={0}
                        max={2000}
                        valueLabelDisplay="auto"
                        valueLabelFormat={v => `$${v}`}
                        sx={styles.slider}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">${priceRange[0]}</Typography>
                        <Typography variant="body2">${priceRange[1]}</Typography>
                    </Stack>
                </Box>
            </FilterSection>

            <FilterSection title="Rating">
                <Stack spacing={0.5} sx={styles.ratingContainer}>
                    {RATINGS.map(r => (
                        <FormControlLabel
                            key={r}
                            control={
                                <Checkbox
                                    checked={selectedRating === r}
                                    onChange={() => setSelectedRating(selectedRating === r ? null : r)}
                                    size="small"
                                    sx={styles.checkbox}
                                />
                            }
                            label={
                                <Typography variant="body2">
                                    {'★'.repeat(r)}{'☆'.repeat(5 - r)} & up
                                </Typography>
                            }
                        />
                    ))}
                </Stack>
            </FilterSection>

            <Button
                fullWidth
                variant="contained"
                onClick={onApply}
                sx={styles.applyButton}
            >
                Apply Filter
            </Button>
        </Box>
    );
};

//Styles
const styles = {
    root: {
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '20px',
        p: 3
    },

    header: {
        mb: 2
    },

    divider: {
        mb: 2
    },

    categoryListContainer: {
        mt: 1,
        maxHeight: 220,
        overflowY: 'auto',
        pr: 0.5,
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            bgcolor: 'rgba(0,0,0,0.4)',
        },
    },

    categoryChip: (isActive) => ({
        justifyContent: 'flex-start',
        borderRadius: '8px',
        fontWeight: isActive ? 700 : 400,
        bgcolor: isActive ? 'black' : 'transparent',
        color: isActive ? 'white' : 'inherit',
        border: '1px solid rgba(0,0,0,0.15)',
        '&:hover': {
            bgcolor: isActive ? '#333' : 'rgba(0,0,0,0.05)'
        },
    }),

    priceContainer: {
        px: 1,
        mt: 2
    },

    slider: {
        color: 'black'
    },

    ratingContainer: {
        mt: 1
    },

    checkbox: {
        color: 'black',
        '&.Mui-checked': { color: 'black' }
    },

    applyButton: {
        bgcolor: 'black',
        color: 'white',
        borderRadius: '62px',
        py: 1.5,
        textTransform: 'none',
        mt: 1,
        '&:hover': { bgcolor: '#333' }
    }
};

export default FilterSidebar;