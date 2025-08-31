import { Delete } from '@mui/icons-material';
import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    Button,
    Divider,
    TextField,
    IconButton,
    ButtonGroup,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    RadioGroup,
    Radio, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Checkbox,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

function Cart({ data, loading, handleDelete, user, fetchDatacard, loadingNew, setCurrency, currency }) {
    const router = useRouter();
    const [agree, setAgree] = useState(false);
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false)
    const [nationality, setNationality] = useState('');
    const [cartItems, setCartItems] = useState(data?.cart_items || []);
    const [paymentOption, setPaymentOption] = useState("full_payment");
    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
        fetchDatacard()
    };
    const handleChange = (event) => {
        setPaymentOption(event.target.value);
    };
    const nationalities = [
        'Bangladesh',
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',


        // Add more as needed
    ];
    const handleIncrement = async (item) => {
        // Convert quantity to number first to avoid string concatenation
        const currentQuantity = Number(item.quantity) || 1;
        const newQuantity = currentQuantity + 1;

        // Update UI immediately
        setCartItems(prev =>
            prev.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            )
        );

        const storedToken = localStorage.getItem('token');

        try {
            // API call
            await axios.put(`https://upackage.etherstaging.xyz/api/cart/update/${item.package_id}`, {
                quantity: newQuantity,
            }, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (fetchDatacard && typeof fetchDatacard === 'function') {
                fetchDatacard();
            }
        } catch (error) {
            console.error("Error updating item:", error);
            // Revert the UI change if the API call fails
            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: currentQuantity } // Revert to original quantity
                        : cartItem
                )
            );
        }
    };

    const handleDecrement = async (item) => {
        const itemId = item.id;

        // Only decrement if quantity is greater than 1
        if ((item.quantity || 1) <= 1) return;

        setCartItems(prev =>
            prev.map(cartItem =>
                cartItem.id === itemId
                    ? { ...cartItem, quantity: Math.max(1, (cartItem.quantity || 1) - 1) }
                    : cartItem
            )
        );

        const newQuantity = Math.max(1, (item.quantity || 1) - 1);
        const storedToken = localStorage.getItem('token');

        try {
            // API call for decrement
            await axios.put(`https://upackage.etherstaging.xyz/api/cart/update/${item.package_id}`, {
                quantity: Number(newQuantity),
            }, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (fetchDatacard && typeof fetchDatacard === 'function') {
                fetchDatacard();
            }
        } catch (error) {
            console.error("Error updating item:", error);
            // Revert the UI change if the API call fails
            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.id === itemId
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                        : cartItem
                )
            );
        }
    };
    const handleEvent = async () => {

        if (!age || !nationality) {
            toast.error('Please fill in both Age and Nationality.');
            return;
        }

        if (isNaN(age)) {
            toast.error('Age must be a valid number.');
            return;
        }

        const storedToken = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'https://upackage.etherstaging.xyz/api/orders',
                {
                    age: age,
                    nationality: nationality,
                    payment_type: paymentOption,
                    currency: currency

                },
                {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response)
                const responses = await axios.post(
                    "https://upackage.etherstaging.xyz/api/orders/payment",
                    {
                        order_id: response?.data?.order?.id,
                        currency: currency

                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (responses.status === 200) {
                    // console.log(responses)
                     router.push(`${responses?.data?.redirect_url}`);
                    setOpen(false);
                } else {

                }
            

        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'An error occurred';
            toast.error(errorMessage);
        }
    };
    const handleEventviewDetails = async () => {

        if (!age || !nationality) {
            toast.error('Please fill in both Age and Nationality.');
            return;
        }

        if (isNaN(age)) {
            toast.error('Age must be a valid number.');
            return;
        }
        setOpen(true)
    }
    useEffect(() => {
        if (data?.cart_items) {
            setCartItems(data?.cart_items);
        }
    }, [data, currency]);

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
            {cartItems?.length > 0 ? (
                <Grid container spacing={4}>
                    {/* Cart Items - 8 Columns */}
                    <Grid item xs={12} md={8}>
                        <Stack direction="column" spacing={2}>
                            {cartItems?.map((item, index) => {
                                return (
                                    <Paper
                                        key={index}
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            border: "1px solid #e0e0e0",
                                            background: "#fff",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        <Stack
                                            direction={{ xs: "column", sm: "row" }}
                                            alignItems={{ xs: "center", sm: "flex-start" }}
                                            spacing={2}
                                        >
                                            {/* Image */}
                                            <Box
                                                sx={{
                                                    width: { xs: "100%", sm: 140 },
                                                    // flexShrink: 0,
                                                    borderRadius: 2,
                                                    // overflow: "hidden",

                                                }}
                                            >
                                                <img
                                                    src={item.
                                                        package_image
                                                    }
                                                    alt={item.
                                                        package_image
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        objectFit: "cover",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            </Box>

                                            {/* Details */}
                                            <Box flex={1}>
                                                <Typography fontSize={15} fontWeight={600}>
                                                    {item.package_name || "Package Name"}
                                                </Typography>
                                                <Typography
                                                    fontSize={12}
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 0.5,
                                                        // lineHeight: 1.4,
                                                    }}
                                                >
                                                    {item.package_description?.slice(0, 80)}...
                                                </Typography>
                                                <Typography
                                                    fontSize={13}
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 0.5,
                                                        fontWeight: "bold"
                                                        // lineHeight: 1.4,
                                                    }}
                                                >
                                                    Price - {currency === "USD" ? "USD" : "BDT"} {item?.converted_amount}
                                                </Typography>
                                            </Box>

                                            {/* Actions */}
                                            <Stack
                                                alignItems={{ xs: "center", sm: "flex-end" }}
                                                spacing={1.5}
                                                direction={{ xs: "row-reverse", lg: "column" }}
                                                justifyContent="space-between"
                                                sx={{
                                                    minWidth: { sm: 110, xs: "100%" },
                                                }}
                                            >
                                                <IconButton
                                                    onClick={() => handleDelete(item?.package_id)}
                                                    sx={{
                                                        bgcolor: "#ffeaea",
                                                        "&:hover": { bgcolor: "#ffcccc" },
                                                    }}
                                                >
                                                    <Delete sx={{ color: "#d32f2f" }} />
                                                </IconButton>

                                                <ButtonGroup
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        borderRadius: "50px",
                                                        overflow: "hidden",
                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                                        "& .MuiButton-root": {
                                                            minWidth: "36px",
                                                            fontWeight: "bold",
                                                            fontSize: "16px",
                                                            padding: "4px 0",
                                                            color: "#011E3C",
                                                            backgroundColor: "#fff",
                                                            transition: "all 0.2s ease-in-out",
                                                            "&:hover": {
                                                                backgroundColor: "#011E3C",
                                                                color: "#fff",
                                                            },
                                                        },
                                                        "& .Mui-disabled": {
                                                            backgroundColor: "#f5f5f5",
                                                            color: "#011E3C",
                                                        },
                                                    }}
                                                >
                                                    <Button onClick={() => handleDecrement(item)}>-</Button>
                                                    <Button disabled>{item.quantity || 1}</Button>
                                                    <Button onClick={() => handleIncrement(item)}>+</Button>
                                                </ButtonGroup>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                )
                            })}
                        </Stack>
                    </Grid>


                    {/* Checkout Sidebar - 4 Columns */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #e0e0e0",
                                background: "linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Title */}
                            <Typography
                                fontSize={15}
                                fontWeight={700}
                                mb={2}
                                sx={{ color: "#011E3C" }}
                            >
                                Checkout Summary
                            </Typography>

                            <Divider sx={{ mb: 2, borderColor: "#ddd" }} />

                            {/* Total Info */}
                            {loadingNew ? <Typography variant="body1" color="initial">loading...</Typography> : <> <Typography fontSize={14} fontWeight={500} mb={0.5}>
                                Number of applicant:{" "}
                                <Typography component="span" fontWeight={600}>
                                    {data?.summary?.total_quantity}
                                </Typography>
                            </Typography>

                                <Typography

                                    fontSize={15}
                                    fontWeight={700}
                                // sx={{ color: "primary.main" }}
                                >
                                    Total Fee: {currency === "USD" ? "USD" : "BDT"} {data?.summary?.total_amount}


                                </Typography>

                            </>}

                            <Divider sx={{ my: 2, borderColor: "#ddd" }} />

                            {/* Payment Option */}
                            <Typography fontSize={14} fontWeight={500} mb={1}>
                                Payment Method
                            </Typography>
                            <RadioGroup name="payment-option" value={paymentOption}
                                onChange={handleChange}>
                                <FormControlLabel
                                    value="partial_payment"
                                    control={<Radio size="small" />}
                                    label="Partial Payment"
                                />
                                <FormControlLabel
                                    value="full_payment"
                                    control={<Radio size="small" />}
                                    label="Full Payment"
                                />
                            </RadioGroup>

                            <Divider sx={{ my: 2 }} />

                            <Typography

                                fontSize={15}
                                fontWeight={700}

                            >
                                Payable Fee: {currency === "USD" ? "USD" : "BDT"} {paymentOption === "full_payment" ? data?.summary?.total_amount : data?.summary?.total_partial_payment_amount
                                }


                            </Typography>

                            {/* Age Field */}
                            <TextField
                                sx={{ mt: 2 }}
                                fullWidth
                                required
                                size="small"
                                label="Age"
                                placeholder="Enter Your Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />

                            {/* Nationality Field */}
                            <FormControl fullWidth sx={{ mt: 2 }} size="small" required>
                                <InputLabel>Nationality</InputLabel>
                                <Select
                                    value={nationality}
                                    label="Nationality"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 220,
                                            },
                                        },
                                    }}
                                    onChange={(e) => setNationality(e.target.value)}
                                >
                                    {nationalities.map((country) => (
                                        <MenuItem key={country} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Checkout Button */}
                            <Button
                                onClick={handleEventviewDetails}
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 3,
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    fontSize: 15,
                                    py: 1.2,
                                    textTransform: "none",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                    "&:hover": {
                                        boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                                    },
                                }}
                            >
                                View all Details
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            ) : (
                <Typography className="Medium" fontSize={18} mt={5}>
                    No items found in your cart.
                </Typography>
            )}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle
                    className='Medium'
                    sx={{
                        fontWeight: 700,
                        bgcolor: "#011E3C",
                        color: "#fff",
                        textAlign: "center",
                        py: 2,
                        borderBottom: "2px solid #ddd",
                    }}
                >
                    🛒 User & Package Summary
                </DialogTitle>

                <DialogContent
                    dividers
                    sx={{
                        background: "linear-gradient(180deg, #f9f9f9 0%, #ffffff 100%)",
                    }}
                >
                    {/* User Info */}
                    <Typography
                        className='Medium'
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: 600, color: "#011E3C", mb: 1 }}
                    >
                        👤 User Information
                    </Typography>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            background: "#f0f6ff",
                            border: "1px solid #d0e3ff",
                            mb: 3,
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={6} className='light'>
                                <Typography fontSize={14} className='light'>
                                    <strong>Name :</strong> {user?.user?.name || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} className='light' >
                                    <strong>Email :</strong> {user?.user?.email || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} className='light'>
                                    <strong>Phone :</strong> {user?.user?.phone || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} className='light'>
                                    <strong>Age :</strong> {age}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography fontSize={14} className='light'>
                                    <strong>Nationality :</strong> {nationality}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2, borderColor: "#ddd" }} />
                        <Typography fontSize={14} className='light'>
                            Select You Currency
                        </Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            size='small'
                            sx={{ width: 100, my: 1 }}
                            id="demo-simple-select"
                            value={currency}
                            onChange={handleChangeCurrency}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"BDT"}>BDT</MenuItem>
                        </Select>
                        <Divider sx={{ my: 2, borderColor: "#ddd" }} />
                        <Typography

                            fontSize={15}
                            fontWeight={700}

                        >
                            Payable Fee : {currency === "USD" ? "USD" : "BDT"} {paymentOption === "full_payment" ? data?.summary?.total_amount : data?.summary?.total_partial_payment_amount
                            }


                        </Typography>
                    </Paper>

                    {/* Package Details */}
                    <Typography
                        variant="subtitle1"
                        className='Medium'
                        gutterBottom
                        sx={{ fontWeight: 600, color: "#011E3C", mb: 1 }}
                    >
                        📦 Package Details
                    </Typography>

                    {cartItems?.length > 0 ? (
                        cartItems.map((item, idx) => (
                            <Paper
                                key={idx}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    border: "1px solid #eee",
                                    background: "#fff",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <img
                                            src={item?.package_image}
                                            alt={item.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </Box>
                                    <Box flex={1}>
                                        <Typography fontSize={15} fontWeight={600}>
                                            {item.package_name}
                                        </Typography>
                                        <Typography fontSize={13} color="text.secondary">
                                            Qty : {item.quantity || 1}
                                        </Typography>
                                        <Typography fontSize={13} fontWeight={600} color="primary">
                                            Price : {currency === "USD" ? "USD" : "BDT"} {item?.converted_amount}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        ))
                    ) : (
                        <Typography fontSize={14}>No package details found.</Typography>
                    )}
                    <Divider sx={{ my: 2 }} />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                color="primary"
                            />
                        }
                        label={
                            <Typography fontSize={14} className='light'>
                                I agree to the {" "}
                                <span onClick={() => window.open("/termsConditions", "_blank")} style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}>
                                    Terms & Conditions
                                </span>
                                <span> , </span>

                                <span onClick={() => window.open("/privacyPolicy", "_blank")} style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}>
                                    Privacy Policy
                                </span>
                                <span> , </span>
                                <span onClick={() => window.open("/refundPolicy", "_blank")} style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}>
                                    Refund Policy
                                </span>
                            </Typography>
                        } />
                </DialogContent>

                <DialogActions
                    sx={{
                        justifyContent: "space-between",
                        px: 3,
                        py: 2,
                        borderTop: "1px solid #eee",
                        background: "#fafafa",
                    }}
                >
                    <Button
                        size='small'
                        onClick={() => setOpen(false)}
                        variant="outlined"
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {

                            handleEvent()
                        }}
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        }}
                    >
                        Proceed to Checkout
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>

    );
}

export default Cart;