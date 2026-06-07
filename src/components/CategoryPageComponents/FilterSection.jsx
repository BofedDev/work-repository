import React, { useState } from 'react';
import { Box, Stack, Typography, Divider, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <Box sx={{ mb: 2 }}>
            <Stack
                direction="row" justifyContent="space-between" alignItems="center"
                onClick={() => setOpen(o => !o)}
                sx={{ cursor: 'pointer', py: 1 }}
            >
                <Typography fontWeight={700}>{title}</Typography>
                {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </Stack>
            <Collapse in={open}>{children}</Collapse>
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

export default FilterSection;