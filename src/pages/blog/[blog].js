import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import Testimonial from '@/components/Testimonial'
import { Box, IconButton, Stack, Typography, Grid } from '@mui/material'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import instance from '../api/api_instance'

function viewblog() {

    const [hover, setHover] = useState();
    const [data, setData] = useState([]);
    const router = useRouter();
    const { blog: id } = router.query;
    console.log(data)
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await instance.get(`/pages/${id}`);

            setData(response.data.body);
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
                    // height: "100vh",
                    flexDirection: "column",
                }}
            >
                <BeatLoader color="#191919" size={30} />
            </Box>
        );
    }
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
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)",
                        zIndex: 1,
                        borderRadius: "5px"
                    }}
                />
                <Box sx={{ height: 691 }}>
                    <img src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave?.file_path}`} alt="About Us" style={{ width: "100%", height: "100%", }} />
                </Box>
                <Typography

                    color="white"
                    className='bold'
                    fontSize={60}
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 150,
                        left: { lg: 70, xl: 210 },
                        textTransform: "capitalize"
                    }}
                >
                    {data[1]?.data[0]?._mave?.title}
                </Typography>
                <Typography

                    color="white"
                    className='Regular'
                    fontSize={50}
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 230,
                        left: { lg: 70, xl: 210 },
                        textTransform: "capitalize"
                    }}
                >
                    {data[1]?.data[0]?._mave?.altDescription?.replace(/<[^>]+>/g, '')}
                </Typography>
            </Box>
            <Box sx={{
                width: "90%",
                maxWidth: 1500, mx: "auto",
            }}>
                {/* <Typography color="initial" className='Regular' sx={{ fontWeight: "regular", fontSize: 40, py: 2 }}>
                    {data[0]?.data[2]?.value?.replace(/<[^>]+>/g, '')}
                </Typography> */}
                <Stack direction={"column"} py={3}>
                    {/* <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 60, }}>
                        {data[1]?.data[0]?._mave?.title}
                    </Typography> */}
                    <Typography className='Regular'
                        dangerouslySetInnerHTML={{ __html: data[1]?.data[0]?._mave?.description }}
                    />


                </Stack>

                <Grid container spacing={2} my={2} >
                    {data[1]?.data[1]?._mave?.
                        medias?.map((item, index) => <Grid item lg={4} key={index}>
                             <img src={`https://engine.uurotravels.com/${item?.file_path}`} alt="About Us" style={{ width: "100%",borderRadius:12 }} />
                        </Grid>)}

                </Grid>
            </Box>
            <Footer />
        </Box>
    )
}

export default viewblog
