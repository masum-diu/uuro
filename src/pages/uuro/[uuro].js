import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Box, Grid, Stack, Typography, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import instance from '../api/api_instance';

function veiwPackage() {
    const router = useRouter();
    const [hover, setHover] = useState();
    const { uuro: packageName, id } = router.query;
    const [data, setData] = useState([]);
    console.log(data)
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await instance.get(`/pages/${id}`);
            setData(response?.data?.body);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [id]);
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    flexDirection: "column",
                }}
            >
                <BeatLoader color="#191919" size={30} />
            </Box>
        );
    }

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
                    src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave.file_path}`}
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
                                src={`https://engine.uurotravels.com/${data[1]?.data[0]?._mave?.media_files
                                    ?.file_path}`}
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
                        <Typography color="#000" fontSize={33} className='light' >Uuro Travels
                        {data[1]?.data[0]?._mave?.
                        description_en
                        ?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={0} mb={3} >
                <Grid item lg={6} bgcolor={"#011E3C"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4, flexDirection: "column" }} >

                    <Typography color="#fff" mb={2} fontWeight={"medium"} fontSize={45} className='light' textAlign={"left"} >
                        {data[1]?.data[1]?._mave?.
                            title_en
                            ?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                    </Typography>
                    <Typography color="#fff" fontSize={35} className='light' textAlign={"left"} > {data[1]?.data[1]?._mave?.
                        description_en
                        ?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                    </Typography>

                    <Stack mt={2} direction={"row"} width={"100%"}  >
                        <IconButton >
                            <img src={"/assets/checkout.png"} width={148} />
                        </IconButton>
                    </Stack>


                </Grid>
                <Grid item lg={6} bgcolor={"#011E3C"}>
                    <img src={`https://engine.uurotravels.com/${data[1]?.data[1]?._mave?.
                        media_files?.
                        file_path}`} style={{ objectFit: "cover", height: "100%", maxHeight: "950px", width: "100%", display: "block", }} />
                </Grid>
            </Grid>
            <Footer />
        </Box>
    )
}

export default veiwPackage