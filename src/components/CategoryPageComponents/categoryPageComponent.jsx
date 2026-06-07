import React, {useState,useEffect,useCallback,useRef} from 'react';
import { useParams } from 'react-router';
import {Box,Drawer,IconButton,useMediaQuery,useTheme} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import FilterSidebar from './FilterSidebar.jsx';
import ProductsHeader from './ProductsHeader.jsx';
import ProductsGrid from './ProductsGrid.jsx';
import { API_BASE_URL } from "../../constants/API.js";

const LIMIT = 9;
const DEFAULT_PRICE_RANGE = [0, 2000];

const CategoryPageComponent = () => {
    const { category } = useParams();
    const prevCategory = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:900px)');

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);

    const [page, setPage] = useState(1);
    const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
    const [selectedRating, setSelectedRating] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        if (prevCategory.current !== null && prevCategory.current !== category) {
            setPage(1);
            setPriceRange(DEFAULT_PRICE_RANGE);
            setSelectedRating(null);
            setSortBy('');
            setOrder('desc');
        }
        prevCategory.current = category;
    }, [category]);

    useEffect(() => {
        fetch(`${API_BASE_URL}products/category-list`)
            .then(res => res.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    const loadAllProducts = useCallback(() => {
        setLoading(true);

        const base = category
            ? `${API_BASE_URL}products/category/${category}`
            : `${API_BASE_URL}products`;

        const params = new URLSearchParams({
            limit: 0,
            ...(sortBy && { sortBy, order }),
        });

        fetch(`${base}?${params}`)
            .then(res => res.json())
            .then(data => {
                setAllProducts(data.products || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [category, sortBy, order]);

    useEffect(() => {
        loadAllProducts();
    }, [loadAllProducts]);

    useEffect(() => {
        let filtered = [...allProducts];

        filtered = filtered.filter(
            p => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        if (selectedRating) {
            filtered = filtered.filter(
                p => Math.floor(p.rating) >= selectedRating
            );
        }

        setTotal(filtered.length);

        const start = (page - 1) * LIMIT;
        setProducts(filtered.slice(start, start + LIMIT));
    }, [allProducts, priceRange, selectedRating, page]);

    const handleSortChange = (value) => {
        if (value === 'default') {
            setSortBy('');
            setOrder('desc');
        } else if (value === 'price-asc') {
            setSortBy('price');
            setOrder('asc');
        } else if (value === 'price-desc') {
            setSortBy('price');
            setOrder('desc');
        } else if (value === 'rating') {
            setSortBy('rating');
            setOrder('desc');
        }
        setPage(1);
    };

    const handleApplyFilters = () => {
        setPage(1);
        if (isMobile) setMobileFilterOpen(false);
    };

    const currentCategory = category
        ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'All Products';

    const filterSidebar = (
        <FilterSidebar
            categories={categories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            onApply={handleApplyFilters}
        />
    );

    return (
        <Box sx={styles.mainContainer}>

            {isMobile && (
                <Drawer
                    anchor="left"
                    open={mobileFilterOpen}
                    onClose={() => setMobileFilterOpen(false)}
                    PaperProps={{
                        sx: styles.drawerPaper
                    }}
                >
                    <Box sx={styles.drawerHeader}>
                        <IconButton onClick={() => setMobileFilterOpen(false)}>
                            ✕
                        </IconButton>
                    </Box>
                    {filterSidebar}
                </Drawer>
            )}

            <Box sx={styles.contentWrapper}>

                {!isMobile && (
                    <Box sx={styles.sidebar}>
                        {filterSidebar}
                    </Box>
                )}

                <Box sx={styles.mainContent}>
                    <ProductsHeader
                        title={currentCategory}
                        total={total}
                        shown={products.length}
                        sortBy={sortBy}
                        order={order}
                        onSortChange={handleSortChange}
                        filterButton={
                            isMobile ? (
                                <IconButton
                                    onClick={() => setMobileFilterOpen(true)}
                                    size="small"
                                    sx={styles.filterButton}
                                >
                                    <TuneIcon />
                                </IconButton>
                            ) : null
                        }
                    />
                    <ProductsGrid
                        products={products}
                        loading={loading}
                        total={total}
                        page={page}
                        limit={LIMIT}
                        onPageChange={setPage}
                        columns={isMobile ? 2 : 3}
                    />
                </Box>
            </Box>
        </Box>
    );
};

//Styles
const styles = {
    mainContainer: {
        maxWidth: 1400,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: 4
    },

    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        alignItems: 'flex-start'
    },

    sidebar: {
        width: '280px',
        flexShrink: 0
    },

    mainContent: {
        flex: 1,
        minWidth: 0
    },

    drawerPaper: {
        width: '100%',
        maxWidth: '100vw',
        p: 2,
        boxSizing: 'border-box',
    },

    drawerHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 1
    },

    filterButton: {
        ml: 1
    }
};

export default CategoryPageComponent;