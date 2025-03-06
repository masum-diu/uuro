import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function veiwPackage() {
    const router = useRouter();
    const [hover, setHover] = useState();
    const { package: packageName } = router.query; 
    return (
        <Box>
            <Layout setHover={setHover} />
            <Box sx={{
                position: "relative",
                width: "100%",
                height: 950,
                // background: "linear-gradient(0deg, #000000 100%,rgba(34, 34, 34, 0.72) 0%)",

            }}>
                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)",
                        zIndex: 1
                    }}
                />

                {/* Image */}
                <img
                    src="/assets/study.png"
                    alt=""
                    width="100%"
                    height={950}
                    style={{ objectFit: "cover" }}
                />

                {/* Text Content */}
                <Typography
                    color="white"
                    fontSize={60}
                    fontWeight="medium"
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 60,
                        left: 40,
                        textTransform: "capitalize"
                    }}
                >
                    {packageName?.replace(/-/g, " ")}

                </Typography>
            </Box>

            <Box sx={{ height: 682, bgcolor: "#F0F0F0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid container spacing={0} justifyContent={"center"} alignItems={"center"} >
                    <Grid item lg={4} position="relative" >
                        <div style={{ position: "relative", width: 350, height: 350 }}>
                            <img
                                src={"/assets/Props.png"}
                                width={350}
                                style={{
                                    objectFit: "cover",
                                    animation: "rotateAnimation 20s linear infinite",
                                    transition: "transform 0.5s ease-in-out",
                                }}
                            />

                            {/* Fixed Logo or Image in the Center */}
                            <img
                                src="/assets/Vectorsdf.png"
                                width={94}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 10,
                                }}
                            />
                        </div>

                        <style jsx>
                            {`
    @keyframes rotateAnimation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}
                        </style>

                    </Grid>

                    <Grid item lg={8} >
                        <Typography color="#000" fontSize={45} className='light' >Uuro Travels
                            Uuro Travel embarks on an expedition
                            to a place so extreme, few athletes have
                            dared to explore it. An adventure to Lake
                            Urro, the deepest lake on earth, with
                            temperatures as low as -40°C. Too cold
                            climb? See how he transitions to the
                            horizontal ice and conquers ten new ice
                            routes.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
           
            <Footer />
        </Box>
    )
}

export default veiwPackage