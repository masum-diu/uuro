import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import Testimonial from '@/components/Testimonial'
import { Box, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import instance from './api/api_instance'

function About() {
  const [hover, setHover] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await instance.get('/pages/7');
      setData(response.data.body);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(0deg, rgba(0, 0, 0, 0.43) 100%, rgba(34, 34, 34, 0.46) 0%)",
            zIndex: 1,
            // borderRadius: "5px"
          }}
        />
        <Box sx={{ 
          height: isMobile ? 300 : isTablet ? 450 : 691, 
          position: "relative" 
        }}>
          <img 
            src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave?.file_path}`} 
            alt="About Us" 
            style={{ 
              width: "100%", 
              height: "100%",
              objectFit: "cover" 
            }} 
          />
        </Box>

        <Typography
          color="white"
          fontSize={isMobile ? 32 : isTablet ? 42 : 62}
          className='bold'
           fontWeight={700}
          sx={{
            position: "absolute",
            zIndex: 2,
            top: isMobile ? 50 : 150,
            left: { xs: 20, lg: 70, xl: 210 },
            textTransform: "capitalize",
            // px: isMobile ? 2 : 0
          }}
        >
          {data[0]?.data[1]?._mave?.text}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box sx={{
        width: "90%",
        maxWidth: 1500, 
        mx: "auto",
        // px: isMobile ? 0 : 3
      }}>
        {/* Introduction Text */}
        <Typography
          className='Regular'
          sx={{ 
            fontSize: isMobile ? 14 : 16, 
            textAlign: "justify", 
            py: 3,
            // px: isMobile ? 2 : 0
          }}
          dangerouslySetInnerHTML={{ __html: data[0]?.data[2]?.value }}
        />

        {/* Cards Section */}
        <Grid container spacing={4} my={2}>
          {data[0]?.data[3]?._mave?.cards?.map((item, index) => (
            <React.Fragment key={index}>
              {/* Mobile - always stack image above text */}
              {isMobile ? (
                <>
                  <Grid item xs={12} >
                    <img
                      src={`https://engine.uurotravels.com/${item?.media_files?.file_path}`}
                      alt="About Us"
                      style={{ width: "100%", borderRadius: 12 }}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <Typography variant="body1" className='SemiBold' fontWeight={600} fontSize={isMobile ? 24 : 35}>
                      {item?.title_en}
                    </Typography>
                    <Typography
                      className='Regular'
                      sx={{ 
                        fontSize: isMobile ? 14 : 16, 
                        textAlign: "justify", 
                        py: 1 
                      }}
                      dangerouslySetInnerHTML={{ __html: item?.description_en }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {/* Desktop - alternate layout */}
                  {index % 2 === 0 ? (
                    <>
                      <Grid item lg={6}>
                        <Typography variant="body1" className='SemiBold'  fontWeight={600} fontSize={35}>
                          {item?.title_en}
                        </Typography>
                        <Typography
                          className='Regular'
                          sx={{ fontSize: 16, textAlign: "justify", py: 1 }}
                          dangerouslySetInnerHTML={{ __html: item?.description_en }}
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <img
                          src={`https://engine.uurotravels.com/${item?.media_files?.file_path}`}
                          alt="About Us"
                          style={{ width: "100%", borderRadius: 12 }}
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item lg={6}>
                        <img
                          src={`https://engine.uurotravels.com/${item?.media_files?.file_path}`}
                          alt="About Us"
                          style={{ width: "100%", borderRadius: 12 }}
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <Typography variant="body1" className='SemiBold' fontWeight={600} fontSize={35}>
                          {item?.title_en}
                        </Typography>
                        <Typography
                          className='Regular'
                          sx={{ fontSize: 16, textAlign: "justify", py: 1 }}
                          dangerouslySetInnerHTML={{ __html: item?.description_en }}
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Grid>

        {/* Mission Section */}
        <Stack direction={"column"} py={2} >
          <Typography color="initial" className='bold'  fontWeight={700} sx={{ 
            fontSize: isMobile ? 28 : 40,
            mb: 1
          }}>
            {data[1]?.data[0]?._mave?.title}
          </Typography>
          <Typography color="initial" className='Regular' sx={{ 
            fontSize: isMobile ? 14 : 16,
            mb: 2
          }}>
            {data[1]?.data[0]?._mave?.altDescription?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
          </Typography>
          <Typography color="initial" className='Regular' sx={{ 
            fontSize: isMobile ? 14 : 16 
          }}>
            {data[1]?.data[0]?._mave?.description?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
          </Typography>
        </Stack>

        {/* Testimonials */}
        <Testimonial data={data[1]?.data[1]?._mave?.cards} />
      </Box>

      {/* Bottom Image */}
      <img 
        src={`https://engine.uurotravels.com/${data[2]?.data[0]?._mave.file_path}`} 
        height={isMobile ? 300 : isTablet ? 500 : 807} 
        width={"100%"} 
        style={{ objectFit: "cover" }} 
      />

      <Footer />
    </Box>
  )
}

export default About