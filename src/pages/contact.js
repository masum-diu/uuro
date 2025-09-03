import { AccessTime, Mail, PhoneInTalk, Place } from '@mui/icons-material'
import { Box, Grid, IconButton, Stack, Typography, TextField, Button } from '@mui/material'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import instance from './api/api_instance'

const contact = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    console.log(data);
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await instance.get('/pages/9');
            setData(response.data.body);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Box sx={{ bgcolor: "#F0F0F0", height: "100vh" }}>
            <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "flex-start", p: { lg: 5, xs: 2 } }}>
                <Link href={"/"}>
                    <IconButton aria-label="" >
                        <img src="/assets/ButtonBack.png" alt="" width={50} />
                    </IconButton></Link>
            </Stack>

            <Typography fontSize={40} className='bold'fontWeight={700} sx={{ textAlign: "center" }} >
                Contact Us
            </Typography>
            <Grid container sx={{
                maxWidth: 1500, mx: "auto", pt: 7,
                width: "90%",
                // bgcolor:"red"
            }}>
                <Stack direction={{ lg: "row", xs: "column" }} spacing={2} width={"100%"} >
                    <Grid item lg={6} rowGap={5.5} display={"flex"} flexDirection={"column"}>
                        <Typography fontSize={15} className='Regular' sx={{ textAlign: "left", color: "#676767" }} >
                            Feel free to contact us any time. We will get back to you as soon as we can.
                        </Typography>
                        <TextField

                            id=""
                            label=""
                            fullWidth
                            size='small'
                            placeholder='Name'
                            variant="standard"
                            className='Medium'


                        />
                        <TextField

                            id=""
                            label=""
                            fullWidth
                            size='small'
                            placeholder='Email'
                            variant="standard"
                            className='Medium'

                        />
                        <TextField
                            className='Medium'
                            id=""
                            label=""
                            fullWidth
                            size='small'
                            placeholder='Message'
                            variant="standard"

                        />
                        <Button variant="contained" color="primary" className='Medium' >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item lg={6} >
                        
                        <Box bgcolor={"#1E1E20"} p={3.3}>
                            <Typography fontSize={24} className='Regular' sx={{ textAlign: "left", color: "#FFFFFF" }} >
                                {data?.[0]?.data[0]?.value}
                            </Typography>
                            <Typography fontSize={18} py={2} className='Medium'fontWeight={500} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <Mail />  {data?.[0]?.data[1]?.value}
                            </Typography>
                            <Typography fontSize={18} py={2} className='Medium'fontWeight={500} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <PhoneInTalk />   {data?.[0]?.data[2]?.value}
                            </Typography>
                            <Typography fontSize={18} py={2} className='Medium'fontWeight={500} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <Place />   {data?.[0]?.data[3]?.value}
                            </Typography>
                            <Typography fontSize={18} py={2} className='Medium' fontWeight={500} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <AccessTime /> {data?.[0]?.data[4]?.value} -  {data?.[0]?.data[4]?._mave?.altText}
                            </Typography>
                        </Box>


                    </Grid>
                </Stack>
            </Grid>
        </Box>
    )
}

export default contact
