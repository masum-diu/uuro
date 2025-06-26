import Footer from '@/components/Footer'
import IamgeCard from '@/components/IamgeCard'
import Layout from '@/components/Layout'
import Slides from '@/components/Slides'
import { Box, Stack, Typography, Grid, Slide, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import instance from './api/api_instance'
import { ClipLoader, BeatLoader } from "react-spinners";
import Testimonial from '@/components/Testimonial'
import Affilation from '@/components/Affilation'
import axios from 'axios'

const Home = () => {
  const router = useRouter();
  const [hover, setHover] = useState();
  const [data, setData] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  //  console.log(dataCategories, "dataCategories");
  const tabs = [
    { name: "Study Abroad", path: "/pakage/study-abroad" },
    { name: "Tour Packages Inbound", path: "/pakage/tour-packages-Inbound" },
    { name: "Visit Visa", path: "/pakage/visit-visa" },
  ];
  const showGrid = router.query.showGrid === "true";
  const gridRef = useRef(null);
  const fetchDatacategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://upackage.etherstaging.xyz/api/categories');
      setDataCategories(response?.data?.categories
);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await instance.get('/pages/3');
      setData(response.data.body);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDatacategories()
    fetchData();
    if (showGrid && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showGrid]);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const [visibleIndex, setVisibleIndex] = useState(0);
const boxRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Only update if we're not at the last item
          setVisibleIndex(prev => {
            const max = data[4]?.data?.length || 0;
            if (prev >= max - 1) return prev; // Don't go beyond last index
            return prev + 1;
          });
        } else {
          // When scrolling back up, decrease the index
          setVisibleIndex(prev => {
            if (prev <= 0) return prev; // Don't go below 0
            return prev - 1;
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.5, // Adjusted threshold for better sensitivity
      rootMargin: '0px 0px -50px 0px' // Adds a small margin at the bottom
    }
  );

  if (boxRef.current) {
    observer.observe(boxRef.current);
  }

  return () => {
    if (boxRef.current) {
      observer.unobserve(boxRef.current);
    }
  };
}, [data]);

const currentItem = data[4]?.data[Math.min(visibleIndex, (data[4]?.data?.length || 1) - 1)];
  const videoUrl = data[4]?.data[3]?._mave?.url;

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
  const rows = data[2]?.data[1]?._mave?.rows;
  return (
    <Box>
      <Layout setHover={setHover} />

      <Box sx={{ 
        position: "relative", 
        width: "100%", 
        height: isMobile ? 400 : isTablet ? 600 : 950, 
        overflow: "hidden" 
      }}>
        {/* Banner Image */}
        <img
          src={`https://engine.uurotravels.com/${data[1]?.data[0]?._mave.file_path}`}
          height={isMobile ? 400 : isTablet ? 600 : 950}
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
          src={`https://engine.uurotravels.com/${data[1]?.data[1]?._mave.file_path}`}
          alt="Logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: hover ? (isMobile ? "300px" : isTablet ? "400px" : "724px") : 
                         (isMobile ? "200px" : isTablet ? "300px" : "547px"),
            transition: "width 0.3s ease-in-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 10,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(181, 181, 182, 0.8), rgba(16, 17, 19, 0.8))",
            color: "#fff",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            textAlign: "center",
            padding: "20px",
            opacity: scrolling ? 1 : 0,
            transform: scrolling ? "translateY(0%)" : "translateY(100%)",
            transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
          }}
        >
          <Grid container spacing={0}>
            <Grid item lg={3} xs={0} display={{ xs: 'none', lg: 'block' }} />
            <Grid item lg={9} xs={12}>
              <Typography
                color="#fff"
                fontSize={isMobile ? 24 : isTablet ? 36 : 60}
                className='Medium'
                sx={{
                  textTransform: "capitalize",
                  textAlign: { xs: "center", lg: "left" },
                  zIndex: 2,
                  lineHeight: 1.1
                }}
              >
                {data[1]?.data[2]?.value?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Grid ref={gridRef} container spacing={3} p={isMobile ? 2 : 3} mt={1} >
        {dataCategories?.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <IamgeCard 
              image={item?.image} 
              title={item?.name} 
              description={item?.description}
              link={`/packages/${item.id}`}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1} p={isMobile ? 2 : 3} mt={3} mb={10}>
        {rows?.[0]?.map((label, index) => (
          <Grid item 
            xs={6} 
            sm={index === 0 ? 4 : index === 1 ? 4 : 2} 
            key={index}
          >
            <Typography
              color="#676767"
              fontSize={isMobile ? 12 : 16}
              className='Regular'
              textAlign={index === 3 ? 'left' : 'left'}
            >
              {label}
            </Typography>
            <Typography
              color="#191919"
              className='SemiBold'
              fontSize={index === 0 ? (isMobile ? 20 : 35) : (isMobile ? 16 : 25)}
              mt={1}
              textAlign={index === 3 ? 'left' : 'left'}
            >
              {rows[1]?.[index] ?? "-"}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <img 
        src={`https://engine.uurotravels.com/${data[3]?.data[0]?._mave.file_path}`} 
        height={isMobile ? 300 : isTablet ? 500 : 950} 
        width={"100%"} 
        style={{ objectFit: "cover" }} 
      />
      
      <Box
        ref={boxRef}
        sx={{
          height: isMobile ? 400 : isTablet ? 500 : 682,
          bgcolor: "#011E3C",
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: isMobile ? 2 : 0
        }}
      >
        {currentItem && (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={4} position="relative" display="flex" justifyContent="center">
              <div style={{ 
                position: "relative", 
                width: isMobile ? 200 : 350, 
                height: isMobile ? 200 : 350 
              }}>
                <img
                  src={"/assets/Circel.png"}
                  width={isMobile ? 200 : 350}
                  style={{
                    objectFit: "cover",
                    animation: "rotateAnimation 20s linear infinite",
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
                <img
                  src={`https://engine.uurotravels.com/${data[4]?.data[0]?._mave?.media_files?.file_path}`}
                  width={isMobile ? 50 : 94}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} lg={8} px={isMobile ? 2 : 0}>
              <Typography 
                color="#fff" 
                fontSize={isMobile ? 16 : 30} 
                className="Regular" 
                textAlign={isMobile ? "center" : "left"}
              >
                {currentItem?._mave?.description_en?.replace(/<[^>]+>/g, "")}
              </Typography>
            </Grid>
          </Grid>
        )}

        <style jsx>{`
          @keyframes rotateAnimation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Box>

      <Box sx={{ bgcolor: "#222222", mb: 3 }}>
        <Grid container spacing={0}>
          {/* Video Grid */}
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            order={{ xs: 2, sm: 2, md: 1 }}
            py={{ xs: 3, sm: 4, md: 6 }}
            px={{ xs: 2, sm: 3, md: 4 }}
          >
            <video autoPlay loop  style={{
                width: "100%",
                height: isMobile ? "300px" : "659px",
              }} src={videoUrl}></video>
          </Grid>

          {/* Image Grid */}
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            order={{ xs: 1, sm: 1, md: 2 }}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <img
              src={`https://engine.uurotravels.com/${data[4]?.data[4]?._mave.file_path}`}
              alt="Responsive Image"
              style={{
                width: "100%",
                height: isMobile ? "300px" : "620px",
                objectFit: "cover"
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <img 
        src={`https://engine.uurotravels.com/${data[4]?.data[5]?._mave.file_path}`} 
        height={isMobile ? 300 : isTablet ? 500 : 807} 
        width={"100%"} 
        style={{ objectFit: "cover" }} 
      />
      
      <Slides data={data[5]?.data[0]?._mave?.cards} />
      
      <Box sx={{ m: 2 }}>
        <Affilation data={data[6]?.data[0]?._mave?.medias ?? []} setHover={setHover} hover={hover} />
      </Box>
      
      <Footer />
    </Box>
  )
}

export default Home