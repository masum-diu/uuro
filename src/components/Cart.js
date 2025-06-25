import { Delete } from '@mui/icons-material';
import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    Button,
    Divider,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

function Cart({ data, loading }) {
    const router = useRouter()
    const handleEvent = async () => {
        const storedToken = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'https://upackage.etherstaging.xyz/api/place-order',
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                 router.push(`${response?.data?.redirect_url}`)
            }
            else {
                toast.error("Failed to place the order. Please try again later.");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'An error occurred';
            toast.error(errorMessage);
        }
    };


    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
            >
                <BeatLoader color="#191919" size={30} />
            </Box>
        );
    }
    return (
        <Box px={3} py={4}>
            <Typography
                className="bold"
                fontSize={24}
                color="initial"
                textAlign={'center'}
                mb={4}
            >
                Your Cart
            </Typography>
            {data?.length > 0 ? <Grid container spacing={4}>
                {/* Cart Items - 8 Columns */}
                <Grid item xs={12} md={8}>
                    <Stack direction="column" spacing={2}>
                        {data?.map((item, index) => (
                            <Paper key={index} elevation={3} sx={{ p: 2 }}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '100%',
                                            maxWidth: '150px',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                        }}
                                    />
                                    <Box flex={1}>
                                        <Typography fontSize={18} className='bold'>
                                            {item.name || 'Package Name'}
                                        </Typography>
                                        <Typography fontSize={14} className='light' color="text.secondary" mb={1}>
                                            {item.description?.slice(0, 100)}...
                                        </Typography>
                                        <Typography
                                            fontSize={16}
                                            className='Medium'
                                            color="#191919"
                                        >
                                            Price: {item.price ? `$${item.price}` : 'Free'}
                                        </Typography>
                                    </Box>
                                    <Delete

                                        style={{
                                            color: '#d32f2f',
                                            cursor: 'pointer',
                                            alignSelf: 'flex-start',
                                        }}
                                    />
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Grid>

                {/* Checkout Sidebar - 4 Columns */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={4} sx={{ p: 3 }}>
                        <Typography fontSize={20} className='bold' mb={2}>
                            Checkout Summary
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Total Price */}
                        <Typography fontSize={16} mb={1} className='Medium'>
                            Total Items: {data?.length}
                        </Typography>
                        <Typography fontSize={18} className='bold' color="primary">
                            Total Price: $
                            {data
                                ?.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0)
                                .toFixed(2)}
                        </Typography>

                        <Button
                            onClick={() => handleEvent()}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className='Medium'
                            size="large"
                            sx={{ mt: 3 }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid> : <Typography className='Medium' fontSize={18} mt={5}>No items found in your cart.</Typography>}

        </Box>
    );
}

export default Cart;
