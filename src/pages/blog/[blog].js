import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import Testimonial from '@/components/Testimonial'
import { Box, IconButton, Stack, Typography, Grid, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import instance from '../api/api_instance'

function ViewBlog() {
    const [hover, setHover] = useState();
    const [data, setData] = useState([]);
    const router = useRouter();
    const { blog: id } = router.query;
    const [loading, setLoading] = useState(false);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
                    height: "100vh",
                    flexDirection: "column",
                }}
            >
                <BeatLoader color="#191919" size={30} />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: "#F0F0F0" }}>
            <Layout setHover={setHover} />

            {/* Hero Section */}
            <Box sx={{ position: "relative", width: "100%" }}>
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
                <Box sx={{ 
                    height: isMobile ? 300 : isTablet ? 450 : 691,
                    position: 'relative'
                }}>
                    <img 
                        src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave?.file_path}`} 
                        alt="Blog Header" 
                        style={{ 
                            width: "100%", 
                            height: "100%",
                            objectFit: "cover" 
                        }} 
                    />
                </Box>
                
                {/* Title and Subtitle */}
                <Box sx={{
                    position: "absolute",
                    zIndex: 2,
                    top: isMobile ? 50 : 150,
                    left: { xs: 20, sm: 40, lg: 70, xl: 210 },
                    right: { xs: 20, sm: 40 },
                    color: "white"
                }}>
                    <Typography
                        className='bold'
                        fontSize={isMobile ? 28 : isTablet ? 40 : 60}
                        sx={{
                            textTransform: "capitalize",
                            lineHeight: 1.2,
                            mb: 1
                        }}
                    >
                        {data[1]?.data[0]?._mave?.title}
                    </Typography>
                    <Typography
                        className='Regular'
                        fontSize={isMobile ? 18 : isTablet ? 30 : 50}
                        sx={{
                            textTransform: "capitalize",
                            lineHeight: 1.2
                        }}
                    >
                        {data[1]?.data[0]?._mave?.altDescription?.replace(/<[^>]+>/g, '')}
                    </Typography>
                </Box>
            </Box>

            {/* Content Section */}
            <Box sx={{
                width: "90%",
                maxWidth: 1500, 
                mx: "auto",
                // px: isMobile ? 2 : 0
            }}>
                <Stack direction={"column"} py={3}>
                    <Typography 
                        className='Regular'
                        sx={{
                            fontSize: isMobile ? 14 : 16,
                            lineHeight: 1.6,
                            '& p': {
                                marginBottom: 2
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: data[1]?.data[0]?._mave?.description }}
                    />
                </Stack>

                {/* Gallery Grid */}
                <Grid 
                    container 
                    spacing={isMobile ? 1 : 2} 
                    my={2}
                    sx={{
                        mb: isMobile ? 4 : 6
                    }}
                >
                    {data[1]?.data[1]?._mave?.medias?.map((item, index) => (
                        <Grid 
                            item 
                            xs={12} 
                            sm={6} 
                            lg={4} 
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <img 
                                src={`https://engine.uurotravels.com/${item?.file_path}`} 
                                alt="Blog content" 
                                style={{ 
                                    width: "100%",
                                    maxWidth: 500,
                                    height: "auto",
                                    borderRadius: 12,
                                    objectFit: 'cover'
                                }} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Footer />
        </Box>
    )
}

export default ViewBlog