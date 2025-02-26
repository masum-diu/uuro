import React from "react";
import Layout from "@/components/Layout";
import { Box, Typography, Grid, Stack, Link, Grid2 } from "@mui/material";
import Banner from "@/components/banner";
import CardList from "@/components/CardList";
import BlogSlider from "@/components/BlogSlider";

const Home = () => {
  return (
    <div>
      <Banner />
      <Layout>
        <Typography
          variant="body1"
          className="exterBold"
          color="initial"
          py={4}
        ></Typography>
        <CardList />

        <Grid2 container spacing={25} py={8}>
          <Grid2
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "left",
              gap: 1,
              pt: 4,
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography className="Medium" fontSize={17}>
                Pro Team Mountaineering
              </Typography>
              <Typography className="Regular" fontSize={20}>
                Uuro Travels
              </Typography>
            </Stack>
          </Grid2>

          <Grid2
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "left",
              gap: 1,
              pt: 4,
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography className="Medium" fontSize={17}>
                Date of Birth
              </Typography>
              <Typography className="Regular" fontSize={20}>
                Get premium clothing at prices that offer great value
              </Typography>
            </Stack>
          </Grid2>
          <Grid2
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "left",
              gap: 1,
              pt: 4,
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography className="Medium" fontSize={17}>
                Date of Birth
              </Typography>
              <Typography className="Regular" fontSize={20}>
                22 Feb 1984
              </Typography>
            </Stack>
          </Grid2>
          <Grid2
            item
            lg={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", lg: "row" },
              alignItems: "flex-start",
              textAlign: "left",
              gap: 1,
              pt: 4,
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography className="Medium" fontSize={17}>
                At Mammut since
              </Typography>
              <Typography className="Regular" fontSize={20}>
                2011
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Layout>
      <Banner />

      <Box
        sx={{
          backgroundColor: "#002041",
          height: "570px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 2,
        }}
      >
        <Grid container sx={{ maxWidth: "80%", alignItems: "center" }}>
          {/* Left Side - Logo */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #3EC4C7",
                transform: "rotate(-30deg)",
              }}
            >
              <Typography
                sx={{
                  color: "#3EC4C7",
                  fontSize: "14px",
                  textAlign: "center",
                  writingMode: "vertical-rl",
                }}
              >
                Uuro Travels & Tourist Service
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Text Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="body1" fontSize={45} color="white">
              Uuro Travel embarks on an expedition to a place so extreme, few
              athletes have dared to explore it. An adventure to Lake Urro, the
              deepest lake on earth, with temperatures as low as -40°C. Too cold
              to climb? See how he transitions to the horizontal ice and
              conquers ten new ice routes.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: "80%" }}>
          {/* Left Side - Video */}
          <Grid item xs={12} md={4}>
            <Box
              component="video"
              autoPlay
              muted
              loop
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src="/assets/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src="/assets/images/banner2.jpg"
              alt="banner 2"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pt: 10,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Banner />
      <BlogSlider />
    </div>
  );
};

export default Home;
