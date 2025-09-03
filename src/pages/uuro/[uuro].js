import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Box, Grid, Stack, Typography, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import instance from '../api/api_instance';
import Link from 'next/link';
import PakagesCard from '@/components/PakagesCard';
import axios from 'axios';

function ViewPackage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dataCategories, setDataCategories] = useState([]);
    const [hover, setHover] = useState();
    const { uuro: packageName, id } = router.query;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const studyAbroadData = dataCategories
    
    const currentItem = studyAbroadData[currentIndex];

    const handleToggle = () => {
        setShow(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % studyAbroadData.length);
            setShow(true);
        }, 300);
    };

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
    const fetchDataCategories = async () => {
        const id = localStorage.getItem('selected_category_id');
        try {
            setLoading(true);
            const response = await axios.get(
                `https://upackage.etherstaging.xyz/api/packages?category_id=${id}`
            );
            setDataCategories(response?.data?.packages || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchDataCategories();
        if (id) fetchData();
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
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <Layout setHover={setHover} />

            {/* Hero Section */}
            <Box sx={{
                position: "relative",
                width: "100%",
                height: { xs: '60vh', md: 950 },
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
                <Box
                    component="img"
                    src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave.file_path}`}
                    alt=""
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: 'block'
                    }}
                />

                {/* Text Content */}
                <Typography
                    color="white"
                    fontSize={{ xs: 36, md: 60 }}
                    className='SemiBold'
                     fontWeight={600}
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: { xs: '30%', md: 150 },
                        left: { xs: '5%', lg: 70, xl: 210 },
                        textTransform: "capitalize",
                        width: { xs: '90%', md: 'auto' },
                        textAlign: { xs: 'left', md: 'left' }
                    }}
                >
                    {packageName?.replace(/-/g, " ")}
                </Typography>
            </Box>

            {/* Content Section */}
            <Box sx={{
                bgcolor: "#F0F0F0",
                py: 3,
                px: { xs: 0, md: 0 }
            }}>
                <Grid
                    container
                    spacing={3}
                    sx={{
                        width: "100%",
                        maxWidth: "1500px",
                        mx: "auto",
                        alignItems: "center"
                    }}
                >
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            position: "relative",
                            width: { xs: 250, sm: 350 },
                            height: { xs: 250, sm: 350 }
                        }}>
                            <Box
                                component="img"
                                src={"/assets/Props.png"}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: "cover",
                                    animation: "rotateAnimation 20s linear infinite",
                                }}
                            />

                            {/* Fixed Logo in Center */}
                            {data[1]?.data[0]?._mave?.media_files?.file_path && (
                                <Box
                                    component="img"
                                    src={`https://engine.uurotravels.com/${data[1]?.data[0]?._mave?.media_files?.file_path}`}
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: 10,
                                        width: { xs: 70, sm: 94 }
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Typography
                            className='Regular'
                            fontSize={{ xs: 16, md: 45 }}
                            textAlign={{ xs: 'left', md: 'justify' }}
                            sx={{ px: { xs: 0, md: 0 },mr:2 }}
                            dangerouslySetInnerHTML={{ __html: data[1]?.data[0]?._mave?.description_en }}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Packages Card Section */}
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <PakagesCard data={studyAbroadData} />
            </Box>

            <Footer />

            <style jsx global>{`
                @keyframes rotateAnimation {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    )
}

export default ViewPackage;