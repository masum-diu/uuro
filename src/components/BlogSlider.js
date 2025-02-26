"use client";

import { Grid, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BlogSlider = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 5 }}>
      <Grid
        container
        sx={{ maxWidth: "80%", margin: "auto", alignItems: "center" }}
      >
        <Grid item xs={12} md={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            GORE-TEX PRO in action
          </Typography>
        </Grid>

        <Grid item xs={12} md={10}>
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={2.5}
            spaceBetween={20}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
          >
            {[
              "/assets/images/blog1.jpg",
              "/assets/images/blog2.jpg",
              "/assets/images/blog3.jpg",
              "/assets/images/blog1.jpg",
            ].map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Blog ${index + 1}`} style={imageStyle} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
};

const imageStyle = {
  width: "480px",
  height: "500px",
  objectFit: "cover",
};

export default BlogSlider;
