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
import { useRouter } from 'next/router';


export default function Slides({ data }) {
    const router = useRouter();
    const handleClick = (id) => {
        const getid = id.split("/").pop(); 
        // console.log(getid, "id in slides")
         router.push(`/blog/${getid}`); // বা '/blog?id=123'
      };
    // console.log(data, "data in slides")
    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 10 },    // Extra small devices
        380: { slidesPerView: 1.1, spaceBetween: 15 },  // Small screens
        600: { slidesPerView: 2, spaceBetween: 20 },  // Phones
        900: { slidesPerView: 3, spaceBetween: 25 },  // Tablets & Laptops
        1200: { slidesPerView: 4, spaceBetween: 30 }, // Desktops
        1536: { slidesPerView: 5, spaceBetween: 30 }, // Extra-large screens
    };
    return (
        <>
            <Swiper
                breakpoints={breakpoints}
                navigation={false}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
                style={{ margin: 20 }}
            >

                <SwiperSlide>
                    {/* Static Text Slide */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "374px",
                            height: "100%",
                            minHeight: 500,
                            objectFit: "cover",
                            borderRadius: "5px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            // backgroundColor: "#f0f0f0",

                        }}
                    >
                        <Typography className='bold' sx={{ fontSize: "24px", px: 2,  }}>
                            Our Blog
                        </Typography>
                        <Typography className='Regular' sx={{ fontSize: "16px", color: "#555", px: 2, py: 1 }}>
                            Discover inspiring travel stories, guides, and tips from our latest posts!
                        </Typography>
                    </div>
                </SwiperSlide>

                {/* Map all images, including index 0 */}
                {data?.map((item, index) => (
                    <SwiperSlide key={index} onClick={()=>handleClick(item?.link_url)} style={{ cursor: "pointer" }}>   
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
                                    borderRadius: "5px" 
                                }}
                            />

                            {/* Image */}
                            <img
                               src={`https://engine.uurotravels.com/${item?.media_files?.file_path}`}
                                alt=""
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover",borderRadius: "5px" }}
                            />

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
                                    p:2,
                                    
                                }}
                            >
                                 {item?.title_en}

                            </Typography>
                        </Box>
                    </SwiperSlide>

                ))}




            </Swiper>
        </>
    );
}
