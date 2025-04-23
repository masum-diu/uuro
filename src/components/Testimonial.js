import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material';


export default function Testimonial({ data }) {

    const [hover, setHover] = useState(false);
    console.log(hover, "data in testimonial")
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },    // Extra small devices
        380: { slidesPerView: 1, spaceBetween: 15 },  // Small screens
        600: { slidesPerView: 2, spaceBetween: 20 },  // Phones
        900: { slidesPerView: 3, spaceBetween: 25 },  // Tablets & Laptops
        1200: { slidesPerView: 3, spaceBetween: 30 }, // Desktops
        1536: { slidesPerView: 3, spaceBetween: 30 }, // Extra-large screens
    };
    return (
        <>
            <Swiper
                breakpoints={breakpoints}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"

                style={{ margin: 20 }}
            >
                {data?.map((item, index) =>
                    <SwiperSlide key={index} style={{ cursor: "pointer" }} onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                        <Box sx={{
                            position: "relative",
                            width: "100%",
                            height: 500,

                            // background: "linear-gradient(0deg, #000000 100%,rgba(34, 34, 34, 0.72) 0%)",

                        }}>
                            {/* Gradient Overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)",
                                    zIndex: 1,
                                    borderRadius: "5px",
                                    //    opacity: hover ? 1 : 0, // Fade-in effect

                                }}
                            />

                            {/* Image */}
                            <img
                                src={`https://engine.uurotravels.com/${item?.media_files?.file_path}`}
                                alt=""
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover", borderRadius: "5px" }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0, // Initially positioned at the bottom
                                    left: 0,
                                    width: "100%",
                                    height: "100%", // Cover the entire height of the card
                                    transform: hover ? 'translateY(0)' : 'translateY(100%)', // Bottom to Top transition effect
                                    opacity: hover ? 1 : 0, // Fade-in effect
                                    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out', // Apply both transition effects
                                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)", // Background color for description
                                    // Add padding around the description text
                                    display: "flex",
                                    flexDirection: "column",
                                    zIndex: 1,
                                    justifyContent: "center", // Align the text towards the bottom
                                    color: "#fff", // Text color
                                    textAlign: "center", // Center text
                                    borderRadius: "5px",
                                }}
                            >
                                <Typography
                                    className='Regular'
                                    sx={{
                                        opacity: hover ? 1 : 0, // Ensure text fades in along with the container
                                        transition: "opacity 0.5s ease-out",
                                        // fontSize: { xl: 20, lg: 16 },
                                        // fontWeight: "bold",
                                        // pt: { xl: 0, lg: 10 }
                                        fontSize: 20,
                                        m: 2,
                                        textAlign: "left",
                                    }}
                                >
                                    {item?.description_en?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                                </Typography>
                            </Box>
                            {/* Text Content */}
                            <Typography
                                color="white"
                                fontSize={22}
                               className='bold'
                                sx={{
                                    position: "absolute",
                                    zIndex: 2,
                                    bottom: 20,
                                    left: 20,
                                    textTransform: "capitalize",
                                    p: 2,

                                }}
                            >
                                {hover === false ? item?.title_en : ""}

                            </Typography>
                        </Box>
                    </SwiperSlide>)}

            </Swiper>
        </>
    );
}
