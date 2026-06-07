import React from 'react';
import { Box, Container, Typography, TextField, Button, Divider, Stack, IconButton, InputAdornment } from '@mui/material';
import { Email, Twitter, Facebook, Instagram, GitHub } from '@mui/icons-material';

const sections = [
    { t: 'COMPANY', l: ['About', 'Features', 'Works', 'Career'] },
    { t: 'HELP', l: ['Customer Support', 'Delivery Details', 'Terms', 'Privacy'] },
    { t: 'FAQ', l: ['Account', 'Deliveries', 'Orders', 'Payments'] },
    { t: 'RESOURCES', l: ['Free eBooks', 'Tutorials', 'Blog', 'YouTube'] }
];

const Footer = () => {
    return (
        <Box component="footer" sx={footerStyles.root}>
            <Container maxWidth="lg">
                <Box sx={footerStyles.newsletter}>
                    <Typography variant="h4" sx={footerStyles.newsletterTitle}>
                        STAY UPTO DATE ABOUT OUR LATEST OFFERS
                    </Typography>

                    <Stack spacing={2} sx={footerStyles.newsletterForm}>
                        <TextField
                            placeholder="Enter your email address"
                            fullWidth
                            size="small"
                            sx={footerStyles.emailInput}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: 'gray' }} />
                                        </InputAdornment>
                                    ),
                                    sx: { height: '48px' }
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={footerStyles.subscribeButton}
                        >
                            Subscribe to Newsletter
                        </Button>
                    </Stack>
                </Box>

                <Box sx={footerStyles.mainContent}>
                    <Box sx={footerStyles.brandSection}>
                        <Typography variant="h4" sx={footerStyles.logo}>
                            SHOP.CO
                        </Typography>
                        <Typography variant="body2" sx={footerStyles.brandDescription}>
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </Typography>
                        <Stack direction="row" spacing={1.5}>
                            {[
                                { Icon: Twitter, url: 'https://www.youtube.com/@VladimirShaitan' },
                                { Icon: Facebook, url: 'https://www.youtube.com/@VladimirShaitan' },
                                { Icon: Instagram, url: 'https://www.youtube.com/@VladimirShaitan' },
                                { Icon: GitHub, url: 'https://www.youtube.com/@VladimirShaitan' }
                            ].map(({ Icon, url }, i) => (
                                <IconButton
                                    key={i}
                                    size="small"
                                    component="a"
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={footerStyles.socialButton}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Stack>
                    </Box>

                    <Box sx={footerStyles.linksSection}>
                        {sections.map((s) => (
                            <Box key={s.t} sx={footerStyles.linkColumn}>
                                <Typography variant="subtitle1" sx={footerStyles.columnTitle}>
                                    {s.t}
                                </Typography>
                                {s.l.map((link) => (
                                    <Typography
                                        key={link}
                                        variant="body2"
                                        sx={footerStyles.link}
                                    >
                                        {link}
                                    </Typography>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider />

                <Box sx={footerStyles.bottomBar}>
                    <Typography variant="caption" sx={footerStyles.copyright}>
                        Shop.co © 2000-2023, All Rights Reserved
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Box key={item} sx={footerStyles.paymentCard} />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

//Styles
const footerStyles = {
    root: {
        bgcolor: '#F0F0F0',
        pt: 10,
        pb: 4,
        mt: 15
    },

    newsletter: {
        bgcolor: '#000',
        borderRadius: '20px',
        p: { xs: 4, md: 6 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 3,
        mt: -22,
        mb: 6,
        position: 'relative',
        zIndex: 10
    },

    newsletterTitle: {
        color: '#fff',
        fontWeight: 900,
        flex: '1 1 500px',
        fontSize: { xs: '28px', md: '40px' }
    },

    newsletterForm: {
        width: { xs: '100%', md: 350 }
    },

    emailInput: {
        bgcolor: '#fff',
        borderRadius: '50px',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
    },

    subscribeButton: {
        bgcolor: '#fff',
        color: '#000',
        borderRadius: '50px',
        fontWeight: 'bold',
        height: '48px',
        textTransform: 'none',
        '&:hover': { bgcolor: '#e0e0e0' }
    },

    mainContent: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        mb: 5
    },

    brandSection: {
        flex: { xs: '1 1 100%', md: '1 1 250px' }
    },

    logo: {
        fontWeight: 900,
        mb: 2
    },

    brandDescription: {
        color: 'rgba(0,0,0,0.6)',
        mb: 3
    },

    socialButton: {
        bgcolor: '#fff',
        color: '#000',
        border: '1px solid #ddd'
    },

    linksSection: {
        flex: '2 1 600px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2
    },

    linkColumn: {
        minWidth: '120px'
    },

    columnTitle: {
        fontWeight: 'bold',
        mb: 2
    },

    link: {
        color: 'rgba(0,0,0,0.6)',
        mb: 1.5,
        cursor: 'pointer',
        '&:hover': { color: '#000' }
    },

    bottomBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3,
        flexWrap: 'wrap',
        gap: 2
    },

    copyright: {
        color: 'rgba(0,0,0,0.6)'
    },

    paymentCard: {
        width: 45,
        height: 30,
        bgcolor: '#fff',
        borderRadius: 1,
        border: '1px solid #eee'
    }
};

export default Footer;