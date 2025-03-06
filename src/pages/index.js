import Footer from '@/components/Footer'
import IamgeCard from '@/components/IamgeCard'
import Layout from '@/components/Layout'
import Slides from '@/components/Slides'
import { Box, Stack, Typography, Grid, Slide } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'


const Home = () => {
  const [hover, setHover] = useState();

  return (
    <Box>
      <Layout setHover={setHover} />
      <Box sx={{ position: "relative", width: "100%", height: 950 }}>
        {/* Banner Image */}
        <img
          src={"/assets/banner.png"}
          height={950}
          width={"100%"}
          style={{
            objectFit: "cover",
            padding: "0px",
            position: "relative",
            padding: hover ? "27px" : "0px",
            transition: "padding 0.3s ease-in-out"
          }}
        />


        <img
          src="/assets/Logo.png"
          alt="Logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: hover ? "724px" : "547px",
            transition: "width 0.3s ease-in-out",

          }}
        />
      </Box>

      <Grid container spacing={3} p={3} mt={1} >

        <Link href={"/package/study-abroad"}>
          <Grid item lg={4}>
            <IamgeCard image={"/assets/Category-Study-(Hero-Banner).png"} title="Student Visa" description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English." />
          </Grid>
        </Link>
        <Link href={"/package/tour-packages-Inbound"}>
        <Grid item lg={4}>
          <IamgeCard image={"/assets/Category-Study-(Hero-Banner).png"} title="Tour Packages Inbound" description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English." />
        </Grid>
        </Link>
        <Link href={"/package/visit-visa"}>
        <Grid item lg={4}>
          <IamgeCard image={"/assets/Category-Study-(Hero-Banner).png"} title="Visit Visa" description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English." />
        </Grid>
        </Link>
      </Grid>
      <Grid container spacing={1} p={3} mt={3} mb={10}>
        <Grid item lg={4}>
          <Typography color="#676767" fontSize={17}>Pro Team Mountaineering</Typography>
          <Typography color="#191919" fontSize={40}>Uuro Travels</Typography>
        </Grid>
        <Grid item lg={4}>
          <Typography color="#676767" fontSize={17}>Euro Travels</Typography>
          <Typography color="#191919" fontSize={25} mt={1}>One of the top Swiss speed climbers</Typography>
        </Grid>
        <Grid item lg={2} >
          <Typography color="#676767" fontSize={17}>Date of Birth</Typography>
          <Typography color="#191919" fontSize={25} mt={1}>22 Feb 1984</Typography>
        </Grid>
        <Grid item lg={2} >
          <Typography color="#676767" textAlign="right" fontSize={17}>
            At Mammut since
          </Typography>
          <Typography color="#191919" textAlign="right" fontSize={25} mt={1} >
            2011
          </Typography>
        </Grid>


      </Grid>

      <img src={"/assets/Banner-2.png"} height={950} width={"100%"} style={{ objectFit: "cover" }} />
      <Box sx={{ height: 682, bgcolor: "#011E3C", mt: 6, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Grid container spacing={0} justifyContent={"center"} alignItems={"center"} >
          <Grid item lg={4} position="relative" >
            <div style={{ position: "relative", width: 350, height: 350 }}>
              <img
                src={"/assets/Circel.png"}
                width={350}
                style={{
                  objectFit: "cover",
                  animation: "rotateAnimation 20s linear infinite",
                  transition: "transform 0.5s ease-in-out",
                }}
              />

              {/* Fixed Logo or Image in the Center */}
              <img
                src="/assets/vlogo.png"
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
            <Typography color="#fff" fontSize={45} className='light' >Uuro Travels
              Uuro Travel embarks on an expedition
              to a place so extreme, few athletes have
              dared to explore it. An adventure to Lake
              Urro, the deepest lake on earth, with
              temperatures as low as -40°C. Too cold
              climb? See how he transitions to the
              horizontal ice and conquers ten new ice
              routes.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ bgcolor: "#222222", mb: 3 }}>
        <Grid container spacing={0}>
          {/* Video Grid */}
          <Grid
            item
            xs={12} sm={4} md={3}
            py={{ xs: 3, sm: 4, md: 6 }}
            px={{ xs: 2, sm: 3, md: 4 }}
          >
            <video
              autoPlay
              loop
              muted
              style={{ maxWidth: "100%", width: "100%", height: "auto" }}
            >
              <source src="/assets/Video.mp4" type="video/mp4" />
            </video>
          </Grid>

          {/* Image Grid */}
          <Grid
            item
            xs={12} sm={8} md={9}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <img
              src="/assets/Static-1280X960.png"
              alt="Responsive Image"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "620px",
                objectFit: "cover"
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <img src={"/assets/HERO-Banner-v2.png"} height={807} width={"100%"} style={{ objectFit: "cover" }} />
      <Slides />
      <Footer />
    </Box>
  )
}

export default Home
