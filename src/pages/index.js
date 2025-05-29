import Footer from '@/components/Footer'
import IamgeCard from '@/components/IamgeCard'
import Layout from '@/components/Layout'
import Slides from '@/components/Slides'
import { Box, Stack, Typography, Grid, Slide } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import instance from './api/api_instance'
import { ClipLoader, BeatLoader } from "react-spinners";

const Home = () => {
  const router = useRouter();
  const [hover, setHover] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(data, "card");
  const tabs = [
    { name: "Study Abroad", path: "/pakage/study-abroad" },
    { name: "Tour Packages Inbound", path: "/pakage/tour-packages-Inbound" },
    { name: "Visit Visa", path: "/pakage/visit-visa" },
  ];
  const showGrid = router.query.showGrid === "true";
  const gridRef = useRef(null);
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleIndex(prev => {
            const max = data[4]?.data.length || 0;
            return prev < max - 1 ? prev + 1 : prev;
          });
        }
      },
      {
        root: null,
        threshold: 0.8,
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
  const medias = data[6]?.data[0]?._mave?.medias ?? [];
  const currentItem = data[4]?.data[visibleIndex];
  const videoUrl = data[4]?.data[4]?._mave?.url;
  const videoId = videoUrl?.split("v=")[1];
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
    <Box >
      <Layout setHover={setHover} />

      <Box sx={{ position: "relative", width: "100%", height: 950, overflow: "hidden", }}>
        {/* Banner Image */}
        <img
          src={`https://engine.uurotravels.com/${data[1]?.data[0]?._mave.file_path}`}
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
          src={`https://engine.uurotravels.com/${data[1]?.data[1]?._mave.file_path}`}
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
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom:10,
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
            <Grid lg={3} >
              {/* <Typography
              color="white"
              fontSize={60}
              className='SemiBold'
              sx={{
                textTransform: "capitalize",
                fontWeight: "regular",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              {data[1]?.data[2]?.value?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
            </Typography> */}
            </Grid>
            <Grid lg={9} >
              <Typography
                color="#fff"
                fontSize={60}
                className='Medium'
                sx={{
                  textTransform: "capitalize",
                  // fontWeight: "regular",
                  textAlign: "left",
                  zIndex: 2,
                  lineHeight:1.1
                }}
              >
                {data[1]?.data[2]?.value?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography
            className='Medium'
            sx={{
              maxWidth: "80%",
              textAlign: "justify",
              fontSize: 35
            }}
          >
            {data[1]?.data[2]?.value?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
          </Typography> */}
        </Box>

      </Box>



      <Grid ref={gridRef} container spacing={3} p={3} mt={1} >

        {data[2]?.data[0]?._mave
          ?.cards?.map((item, index) => {

            return (<Grid item lg={4} key={index} >

              <IamgeCard image={`https://engine.uurotravels.com/${item?.media_files
                ?.file_path}`} title={item?.title_en} description={item?.description_en?.replace(/<[^>]+>/g, '')} link={"/pakages"} />
            </Grid>)
          })}





      </Grid>
      <Grid container spacing={1} p={3} mt={3} mb={10}>


        {rows?.[0]?.map((label, index) => (
          <Grid item lg={index === 0 ? 4 : index === 1 ? 4 : 2} key={index}>
            <Typography
              color="#676767"
              fontSize={16}
              className='Regular'
              textAlign={index === 3 ? 'right' : 'left'}
            >
              {label}
            </Typography>
            <Typography
              color="#191919"
              className='SemiBold'
              fontSize={index === 0 ? 35 : 25}
              mt={1}
              textAlign={index === 3 ? 'right' : 'left'}
            >
              {rows[1]?.[index] ?? "-"}
            </Typography>
          </Grid>
        ))}

      </Grid>

      <img src={`https://engine.uurotravels.com/${data[3]?.data[0]?._mave.file_path}`} height={950} width={"100%"} style={{ objectFit: "cover" }} />
      <Box
        ref={boxRef}
        sx={{
          height: 682,
          bgcolor: "#011E3C",
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentItem && (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item lg={4} position="relative">
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
                <img
                  src={`https://engine.uurotravels.com/${data[4]?.data[0]?._mave?.media_files
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
            </Grid>

            <Grid item lg={8}>
              <Typography color="#fff" fontSize={30} className="Regular" textAlign="left">
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
            xs={12} sm={4} md={3}
            py={{ xs: 3, sm: 4, md: 6 }}
            px={{ xs: 2, sm: 3, md: 4 }}
          >
            <iframe
              style={{
                width: "100%",
                height: "100%",
                minHeight: "659px",

              }}
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
              src={`https://engine.uurotravels.com/${data[4]?.data[4]?._mave.file_path}`}
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

      <img src={`https://engine.uurotravels.com/${data[4]?.data[5]?._mave.file_path}`} height={807} width={"100%"} style={{ objectFit: "cover" }} />
      <Slides data={data[5]?.data[0]?._mave?.cards} />
      <Box
        className="marquee-container"
        sx={{
          bgcolor: "#011E3C",
          py: 10,
          mb: 3,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Box className="marquee-track">
          {
            [...medias, ...medias, ...medias].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'inline-block',
                  width: 150,
                  mx: 1,
                }}
              >
                <img
                  src={`https://engine.uurotravels.com/${item?.file_path}`}
                  alt={`media-${index}`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Box>
            ))
          }
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Home
