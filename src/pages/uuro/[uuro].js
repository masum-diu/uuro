import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Box, Grid, Stack, Typography, IconButton, ButtonGroup, Button, Fade } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import instance from '../api/api_instance';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
function veiwPackage() {
    const router = useRouter();
    const [toggler, setToggler] = useState(false)
    const [hover, setHover] = useState();
    const { uuro: packageName, id } = router.query;
    const [data, setData] = useState([]);
    console.log(data)
    const [loading, setLoading] = useState(false);
     const [show, setShow] = useState(true); // for triggering fade transition

    const handleToggle = () => {
    setShow(false); // Start fade-out

    setTimeout(() => {
        setToggler((prev) => !prev); // Switch image
        setShow(true); // Start fade-in
    }, 300); // Must match Fade timeout duration
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
                    className='SemiBold'
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 150,
                        left: { lg: 70, xl: 210 },
                        textTransform: "capitalize"
                    }}
                >
                    {packageName?.replace(/-/g, " ")}

                </Typography>
            </Box>

            <Box sx={{ bgcolor: "#F0F0F0", display: "flex", justifyContent: "center", alignItems: "center", }}>
                <Grid container spacing={0} justifyContent={"center"} py={3} alignItems={"center"} sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }} >
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

                    <Grid item lg={8}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}> {/* Set a fixed height here */}

                            <Typography className='Regular' fontSize={20} textAlign={"justify"}
                                dangerouslySetInnerHTML={{ __html: data[1]?.data[0]?._mave?.description_en }}
                            />
                            {/* <Typography color="#000" fontSize={16} className="light" textAlign={"justify"}>
                
                                {data[1]?.data[0]?._mave?.description_en
                                    ?.replace(/<[^>]+>/g, '')
                                    .replace(/&nbsp;/g, ' ')}
                            </Typography> */}
                        </Box>
                    </Grid>

                </Grid>
            </Box>
            <Box my={4} bgcolor={"#011E3C"} position="relative">
                {/* Content Grid */}
                <Grid container spacing={0} sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}>
                    <Grid item lg={6} bgcolor={"#011E3C"} sx={{ py: 4, pr: 4, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <Typography
                            color="#fff"
                            mb={2}
                            fontSize={36}
                            className="Medium"
                            textAlign="left"
                        >
                            {data[1]?.data[1]?._mave?.title_en
                                ?.replace(/<[^>]+>/g, "")
                                .replace(/&nbsp;/g, " ")}
                        </Typography>

                        <Typography
                            color="#fff"
                            textAlign="justify"
                            fontSize={28}
                            className="light"
                        >
                            {data[1]?.data[1]?._mave?.description_en
                                ?.replace(/<[^>]+>/g, "")
                                .replace(/&nbsp;/g, " ")}
                        </Typography>

                        <Stack mt={2} direction="row" width="100%">
                            <IconButton>
                                <img src="/assets/Group13(1).png" width={148} alt="icon1" />
                            </IconButton>
                            <IconButton>
                                <img src="/assets/Group8.png" width={148} alt="icon2" />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {/* Image */}
                    <Grid item lg={6} bgcolor={"#011E3C"}>
                       <Fade in={show} timeout={300}>
                        <img
                            src={
                                toggler
                                    ? "/assets/study.png"
                                    : `https://engine.uurotravels.com/${data[1]?.data[1]?._mave?.media_files?.file_path}`
                            }
                            alt="About Us"
                            style={{
                                objectFit: "cover",
                                height: "100%",
                                maxHeight: "950px",
                                width: "100%",
                                display: "block",
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        />
                    </Fade>
                    </Grid>
                </Grid>

                {/* Right Positioned Buttons */}
                <Stack spacing={1}
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        right: { lg: 5, xl: 70 },
                        zIndex: 10,
                    }}
                >
                    
                    <IconButton  onClick={() => handleToggle()}
                        sx={{
                            border: "1px solid #011E3C",
                            color: "#fff",
                            backgroundColor: "#011E3C",
                            borderRadius: "50%",
                            boxShadow: "0px 2px 12px rgb(161, 166, 171)", // 🔥 Box Shadow added
                            "&:hover": {
                                backgroundColor: "#02294F",
                                boxShadow: "0px 2px 16px #011E3C", // Optional: slightly stronger shadow on hover
                            }
                        }}
                    >
                        <ArrowDownwardIcon />
                    </IconButton>



                </Stack>
            </Box>
            <Footer />
        </Box>
    )
}

export default veiwPackage