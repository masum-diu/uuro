import { useAuth } from '@/authcontext/AuthContext';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

function pakages() {
    const router = useRouter();
    const { token } = useAuth();
    const handleEvent = () => {
        if (token) {
            router.push("/profile");
        } else {
            router.push("/login");
        }
    };
    return (
        <Box sx={{ px: 3, bgcolor: "#F0F0F0", py: 8 }}>
            <Stack direction={"row"} sx={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                <Link href="/?showGrid=true" passHref>
                    <IconButton aria-label="" sx={{
                        objectFit: "cover",
                        position: "fixed",
                        zIndex: 1000,
                        right: 10,
                    }}>

                        <img
                            src="/assets/Group 10.png"
                            alt=""
                            style={{
                                width: 45,
                            }}
                        />
                    </IconButton>
                </Link>
            </Stack>

            <Grid container columnSpacing={5} >
                <Grid
                    item
                    lg={8}
                    sx={{
                        display: "flex",
                        columnGap: 3,
                        mt: 5,
                        position: "sticky",
                        top: 80,
                        backgroundColor: "white",
                        zIndex: 10,
                        height: 522
                    }}
                >
                    <img
                        src="/assets/Category-Study-(Hero-Banner).png"
                        alt=""
                        style={{ width: "25%", objectFit: "cover", flexGrow: 1 }}
                    />
                    <img
                        src="/assets/Category-Study-(Hero-Banner).png"
                        alt=""
                        style={{ width: "25%", objectFit: "cover", flexGrow: 1 }}
                    />
                </Grid>
                <Grid item lg={4}>
                    <Stack direction={"column"} spacing={3}>

                        <Stack direction={"column"} spacing={5}>
                            <img
                                src="/assets/Category-Study-(Hero-Banner).png"
                                alt=""
                                style={{ width: "100%", height: 267, objectFit: "cover" }}
                            />
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{
                                    borderTop: "1px solid #000000",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                Package-1
                                <img
                                    onClick={handleEvent}
                                    src={"/assets/checkout.png"}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        maxWidth: "148px",
                                        objectFit: "cover",
                                    }}
                                />
                            </Typography>
                        </Stack>
                        <Stack direction={"column"} spacing={5}>
                            <img
                                src="/assets/Category-Study-(Hero-Banner).png"
                                alt=""
                                style={{ width: "100%", height: 267, objectFit: "cover" }}
                            />
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{
                                    borderTop: "1px solid #000000",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                Package-2
                                <img
                                    onClick={handleEvent}
                                    src={"/assets/checkout.png"}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        maxWidth: "148px",
                                        objectFit: "cover",
                                    }}
                                />
                            </Typography>
                        </Stack>
                        <Stack direction={"column"} spacing={5}>
                            <img
                                src="/assets/Category-Study-(Hero-Banner).png"
                                alt=""
                                style={{ width: "100%", height: 267, objectFit: "cover" }}
                            />
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{
                                    borderTop: "1px solid #000000",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                Package-3
                                <img
                                    onClick={handleEvent}
                                    src={"/assets/checkout.png"}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        maxWidth: "148px",
                                        objectFit: "cover",
                                    }}
                                />
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>


        </Box>
    )
}

export default pakages