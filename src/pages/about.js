import Layout from "@/components/Layout";
import { Box, Typography, Grid, Stack } from "@mui/material";
import React from "react";
const about = () => {
  return (
    <Box>
      <Layout />
      <Box>
        <img
          src="assets/about.jpg"
          style={{
            width: "100%",
            height: "550px",
            objectFit: "cover",
          }}
        />
        <Typography
          className="light"
          fontSize={80}
          color={"#ffffff"}
          sx={{
            position: "absolute",
            top: "40%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Adjust position precisely
            textAlign: "center",
          }}
        >
          About Us
        </Typography>
        <Grid container spacing={2} pl={4} py={20}>
          <Grid item lg={8} md={8} xs={12}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
              sx={{ position: "relative" }}
            >
              <Typography
                className="light"
                fontSize={30}
                color={"#00000"}
                sx={{
                  position: "absolute",
                }}
              >
                Challenges make us grow. As mountaineers, we choose to be active
                in the most demanding and beautiful environments on earth.
                Whether it's success at the summit after a seemingly endless
                ascent or the umpteenth attempt at one of the most difficult
                routes in the world – those who love mountain sports love a
                challenge. And that's something we celebrate.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Typography
          className="light"
          fontSize={50}
          color={"#00000"}
          sx={{
            position: "absolute",
            pl: 6,
            pt: 2,
          }}
        >
          Testimonial
        </Typography>
        <Typography
          className="light"
          fontSize={50}
          color={"#00000"}
          sx={{
            position: "absolute",
            pl: 6,
            pt: 2,
          }}
        >
          Testimonial
        </Typography>
        <Typography
          className="light"
          fontSize={16}
          color={"#00000"}
          sx={{
            position: "absolute",
            p: 6,
          }}
        >
          Discover the stories of people who risk failure. People who throw
          themselves into adventure only to find the next challenge. People who
          surpass themselves. 
        </Typography>
      </Box>
    </Box>
  );
};
export default about;
