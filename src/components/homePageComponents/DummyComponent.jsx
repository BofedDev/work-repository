import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import Navbar from '../reusableComponents/navbar.jsx';

const DummyComponent = () => {
    return (
        <>
            <CssBaseline />

            <Container  sx={{ py: 4 }}>
                <Navbar title="Мій головний контент" />
            </Container>
        </>
    );
};

export default DummyComponent;