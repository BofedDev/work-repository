import React from 'react';
import { Card, CardContent, Typography, Stack, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ReviewCard = ({ name, comment, rating, showRating = true }) => {
    return (
        <Card sx={reviewCardStyles.card}>
            <CardContent sx={reviewCardStyles.cardContent}>
                {showRating && (
                    <Rating
                        value={rating || 5}
                        readOnly
                        precision={0.5}
                        sx={reviewCardStyles.rating}
                    />
                )}

                <Stack direction="row" alignItems="center" spacing={0.5} sx={reviewCardStyles.nameContainer}>
                    <Typography variant="h6" sx={reviewCardStyles.name}>
                        {name}
                    </Typography>
                    <CheckCircleIcon sx={reviewCardStyles.verifiedIcon} />
                </Stack>

                <Typography variant="body1" sx={reviewCardStyles.comment}>
                    "{comment}"
                </Typography>
            </CardContent>
        </Card>
    );
};

//Styles
const reviewCardStyles = {
    card: {
        minWidth: { xs: '280px', md: '400px' },
        borderRadius: '20px',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: 'none',
        height: '100%'
    },

    cardContent: {
        p: 3
    },

    rating: {
        mb: 1.5,
        color: '#FFC633'
    },

    nameContainer: {
        mb: 1
    },

    name: {
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },

    verifiedIcon: {
        color: '#01AB31',
        fontSize: '18px'
    },

    comment: {
        color: 'rgba(0,0,0,0.6)',
        lineHeight: 1.6
    }
};

export default ReviewCard;