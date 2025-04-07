import { AccessTime, Mail, PhoneInTalk, Place } from '@mui/icons-material'
import { Box, Grid, IconButton, Stack, Typography, TextField, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const contact = () => {
    return (
        <Box sx={{ bgcolor: "#F0F0F0", height: "100vh" }}>
            <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "flex-start", p: { lg: 5, xs: 2 } }}>
                <Link href={"/"}>
                    <IconButton aria-label="" >
                        <img src="/assets/ButtonBack.png" alt="" width={50} />
                    </IconButton></Link>
            </Stack>

            <Typography fontSize={40} fontWeight={"medium"} sx={{ textAlign: "center" }} >
                Contact Us
            </Typography>
            <Grid container sx={{
                maxWidth: 1500, mx: "auto", pt: 7,
                width: "90%",
                // bgcolor:"red"
            }}>
                <Stack direction={{ lg: "row", xs: "column" }} spacing={2} width={"100%"} >
                    <Grid item lg={6} rowGap={5.5} display={"flex"} flexDirection={"column"}>
                        <Typography fontSize={15} fontWeight={"regular"} sx={{ textAlign: "left", color: "#676767" }} >
                            Feel free to contact us any time. We will get back to you as soon as we can.
                        </Typography>
                        <TextField

                            id=""
                            label=""
                            fullWidth
                            size='small'
                            placeholder='Name'
                            variant="standard"


                        />
                        <TextField

                            id=""
                            label=""
                            fullWidth
                            size='small'
                            placeholder='Email'
                            variant="standard"

                        />
                        <TextField

                            id=""
                            label=""
                            fullWidth
                            size='small'
                            placeholder='Message'
                            variant="standard"

                        />
                        <Button variant="contained" color="primary" >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item lg={6} >
                        <Box bgcolor={"#1E1E20"} p={3.3}>
                            <Typography fontSize={24} fontWeight={"regular"} sx={{ textAlign: "left", color: "#FFFFFF" }} >
                                About information
                            </Typography>
                            <Typography fontSize={18} py={2} fontWeight={"medium"} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <Mail /> Example@sample.com
                            </Typography>
                            <Typography fontSize={18} py={2} fontWeight={"medium"} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <PhoneInTalk />  +123 456 789 10
                            </Typography>
                            <Typography fontSize={18} py={2} fontWeight={"medium"} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <Place />  Street. Avenue Buolevard No 422, 2011
                            </Typography>
                            <Typography fontSize={18} py={2} fontWeight={"medium"} sx={{ textAlign: "left", color: "#FFFFFF", display: "flex", alignItems: "center", columnGap: 1 }} >
                                <AccessTime />08:00 - 17:00
                            </Typography>
                        </Box>


                    </Grid>
                </Stack>
            </Grid>
        </Box>
    )
}

export default contact
