import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import Testimonial from '@/components/Testimonial'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'

function about() {
     const [hover, setHover] = useState();
    return (

        <Box sx={{ bgcolor: "#F0F0F0", }}>
            <Layout setHover={setHover} />

            {/* <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center", p: 5 }}>
                <Link href={"/"}>
                    <IconButton aria-label="" >
                        <img src="/assets/ButtonBack.png" alt="" width={50} />
                    </IconButton></Link>

            </Stack> */}
            <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
                <img src="/assets/aboutus.png" alt="About Us" width="100%" />

                <Typography

                    color="white"
                    fontSize={120}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontWeight: "regular",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                    }}
                >
                    About Us
                </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
                <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 40, py: 2 }}>
                    Challenges make us grow. As mountaineers, we choose to be active
                    in the most demanding and beautiful environments on earth.
                    Whether it's success at the summit after a seemingly endless
                    ascent or the umpteenth attempt at one of the most difficult routes
                    in the world – those who love mountain sports love a challenge. And
                    that's something we celebrate.
                </Typography>
                <Stack direction={"column"} py={3}>
                    <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 60, }}>
                        Testimonial
                    </Typography>
                    <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 25, }}>
                        Discover the stories of people who risk failure. People who throw themselves into

                    </Typography>
                    <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 25, }}>
                        adventure only to find the next challenge. People who surpass themselves.

                    </Typography>

                </Stack>
                <Testimonial />
                <img src={"/assets/HERO-Banner-v2.png"} height={807} width={"100%"} style={{ objectFit: "cover" }} />

            </Box>
            <Footer />
        </Box>
    )
}

export default about
