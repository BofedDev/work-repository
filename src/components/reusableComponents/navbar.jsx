import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {AppBar,Toolbar,Typography,Box,IconButton,styled,Container,Drawer,List,ListItem,ListItemText,useMediaQuery,Divider,Collapse,} from '@mui/material';
import {ShoppingCartOutlined as CartIcon,AccountCircleOutlined as UserIcon,Menu as MenuIcon,Search as SearchIcon,
    Close as CloseIcon,KeyboardArrowDown as ArrowDownIcon,HomeOutlined as HomeIcon,GridViewOutlined as CategoryIcon,} from '@mui/icons-material';

import SearchBar from '@components/reusableComponents/SearchBar.jsx';
import { API_BASE_URL } from '../../constants/API.js';

const Navbar = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:900px)');

    const [categories, setCategories] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [categoriesExpanded, setCategoriesExpanded] = useState(false);

    const searchInputRef = useRef(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}products/category-list`)
            .then(res => res.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 80);
        }
    }, [searchOpen]);

    useEffect(() => {
        document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen, searchOpen]);

    const closeMobile = () => {
        setMobileOpen(false);
        setCategoriesExpanded(false);
    };

    const handleNavTo = (path) => {
        closeMobile();
        navigate(path);
    };

    const desktopLinks = [
        { label: 'On Sale',      path: '/category/on-sale' },
        { label: 'New Arrivals', path: '/category/new-arrivals' },
        { label: 'Brands',       path: '/category/brands' },
    ];

    return (
        <>
            <AppBar position="sticky" color="transparent" elevation={0} sx={appBarSx}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={toolbarSx}>

                        {isMobile && (
                            <IconButton onClick={() => setMobileOpen(true)} size="small" sx={{ color: '#000' }} aria-label="Открыть меню">
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Typography onClick={() => navigate('/')} sx={logoSx}>
                            SHOP.CO
                        </Typography>

                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '28px' }}>

                                <Box sx={shopWrapperSx}>
                                    <NavLink onClick={() => navigate('/category')}>
                                        Shop <ArrowDownIcon sx={{ fontSize: 16, ml: '2px' }} />
                                    </NavLink>
                                    <Box className="shop-dropdown" sx={shopDropdownSx}>
                                        {categories.map(cat => (
                                            <Box
                                                key={cat}
                                                onClick={() => navigate(`/category/${cat}`)}
                                                sx={shopDropdownItemSx}
                                            >
                                                {cat.replace(/-/g, ' ')}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>

                                {desktopLinks.map(({ label, path }) => (
                                    <NavLink key={path} onClick={() => navigate(path)}>
                                        {label}
                                    </NavLink>
                                ))}
                            </Box>
                        )}

                        {!isMobile && (
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', px: 3, maxWidth: 520 }}>
                                <SearchBar />
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                            {isMobile && (
                                <IconButton onClick={() => setSearchOpen(true)} size="small" sx={{ color: '#000' }} aria-label="Поиск">
                                    <SearchIcon />
                                </IconButton>
                            )}
                            <IconButton onClick={() => navigate('/cart')} size="small" sx={{ color: '#000', position: 'relative' }} aria-label="Корзина">
                                <CartIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#000' }} aria-label="Аккаунт">
                                <UserIcon />
                            </IconButton>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={closeMobile} PaperProps={{ sx: drawerPaperSx }} SlideProps={{ timeout: 280 }}>
                <Box sx={drawerHeaderSx}>
                    <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.3px' }}>
                        SHOP.CO
                    </Typography>
                    <IconButton onClick={closeMobile} size="small" edge="end" aria-label="Закрыть">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
                    <List disablePadding>
                        <ListItem button onClick={() => handleNavTo('/')} sx={drawerItemSx}>
                            <HomeIcon sx={drawerIconSx} />
                            <ListItemText primary="Главная" primaryTypographyProps={drawerTextProps} />
                        </ListItem>

                        <ListItem button onClick={() => setCategoriesExpanded(p => !p)} sx={drawerItemSx}>
                            <CategoryIcon sx={drawerIconSx} />
                            <ListItemText primary="Каталог" primaryTypographyProps={drawerTextProps} />
                            <ArrowDownIcon sx={{
                                fontSize: 18,
                                color: 'text.secondary',
                                transition: 'transform .25s',
                                transform: categoriesExpanded ? 'rotate(180deg)' : 'none',
                            }} />
                        </ListItem>

                        <Collapse in={categoriesExpanded} timeout={220}>
                            <List disablePadding sx={{ pl: 2 }}>
                                <ListItem button onClick={() => handleNavTo('/category')} sx={{ ...drawerItemSx, py: 1 }}>
                                    <ListItemText primary="Все категории" primaryTypographyProps={{ ...drawerTextProps, fontWeight: 500 }} />
                                </ListItem>
                                {categories.map(cat => (
                                    <ListItem key={cat} button onClick={() => handleNavTo(`/category/${cat}`)} sx={{ ...drawerItemSx, py: 1 }}>
                                        <ListItemText
                                            primary={cat.replace(/-/g, ' ')}
                                            primaryTypographyProps={{
                                                ...drawerTextProps,
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                color: 'text.secondary',
                                                textTransform: 'capitalize',
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Box>

                <Divider />
                <Box sx={drawerFooterSx}>
                    <IconButton onClick={() => { closeMobile(); navigate('/cart'); }} sx={drawerFooterIconBtnSx} aria-label="Корзина">
                        <CartIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={drawerFooterIconBtnSx} aria-label="Аккаунт">
                        <UserIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', ml: 'auto' }}>
                        Вход / Регистрация
                    </Typography>
                </Box>
            </Drawer>

            {searchOpen && isMobile && (
                <>
                    <Box onClick={() => setSearchOpen(false)} sx={searchBackdropSx} />
                    <Box sx={searchPanelSx}>
                        <Box sx={searchPanelHeaderSx}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Поиск</Typography>
                            <IconButton size="small" onClick={() => setSearchOpen(false)} aria-label="Закрыть поиск">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box sx={{ px: 2, pb: 2 }}>
                            <SearchBar inputRef={searchInputRef} />
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

//Styles

const NavLink = styled(Typography)({
    fontSize: '15px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    fontWeight: 500,
    '&:hover': { opacity: 0.5 },
});

const appBarSx = {
    top: 0,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    background: 'rgba(255,255,255,0.92)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    zIndex: 1200,
};

const toolbarSx = {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '8px', md: '32px' },
    px: { xs: 1.5, sm: 2 },
    minHeight: { xs: 56, md: 64 },
};

const logoSx = {
    fontWeight: 900,
    cursor: 'pointer',
    letterSpacing: '-0.5px',
    fontSize: { xs: '1.15rem', md: '1.4rem' },
    userSelect: 'none',
    flexShrink: 0,
};

const shopWrapperSx = {
    position: 'relative',
    paddingBottom: '12px',
    marginBottom: '-12px',
    '&:hover .shop-dropdown': {
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(-50%) translateY(0)',
    },
    '&:hover > p': {
        opacity: 0.5,
    },
};

const shopDropdownSx = {
    position: 'absolute',
    top: 'calc(100% - 2px)',
    left: '50%',
    transform: 'translateX(-50%) translateY(-6px)',
    minWidth: 180,
    bgcolor: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.08)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
    pt: '8px',
    pb: '6px',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity .18s ease, transform .18s ease',
    zIndex: 1300,
};

const shopDropdownItemSx = {
    px: 2,
    py: '9px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textTransform: 'capitalize',
    borderRadius: '8px',
    mx: '4px',
    color: '#000',
    transition: 'background .12s',
    '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' },
};

const drawerPaperSx = {
    width: '80vw',
    maxWidth: 320,
    borderRadius: '0 20px 20px 0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};

const drawerHeaderSx = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2.5,
    py: 2,
    borderBottom: '1px solid rgba(0,0,0,0.07)',
};

const drawerItemSx = {
    px: 2.5,
    py: 1.25,
    borderRadius: '12px',
    mx: 1,
    mb: 0.25,
    transition: 'background .15s',
    '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
    '&:active': { bgcolor: 'rgba(0,0,0,0.08)' },
};

const drawerIconSx = {
    fontSize: 20,
    mr: 1.5,
    color: 'text.secondary',
    flexShrink: 0,
};

const drawerTextProps = {
    fontSize: '15px',
    fontWeight: 600,
};

const drawerFooterSx = {
    px: 2.5,
    py: 2,
    display: 'flex',
    gap: 1.5,
    alignItems: 'center',
};

const drawerFooterIconBtnSx = {
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    p: 1,
};

const searchBackdropSx = {
    position: 'fixed',
    inset: 0,
    bgcolor: 'rgba(0,0,0,0.4)',
    zIndex: 1299,
    animation: 'fadeIn .2s ease',
    '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
};

const searchPanelSx = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
    bgcolor: '#fff',
    pt: 'env(safe-area-inset-top)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    borderRadius: '0 0 20px 20px',
    animation: 'slideDown .25s cubic-bezier(.4,0,.2,1)',
    '@keyframes slideDown': {
        from: { transform: 'translateY(-100%)' },
        to:   { transform: 'translateY(0)' },
    },
};

const searchPanelHeaderSx = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    pt: 2,
    pb: 0.5,
};

export default Navbar;