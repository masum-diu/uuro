import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import Testimonial from '@/components/Testimonial'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import instance from './api/api_instance'

function about() {
  const [hover, setHover] = useState();
  const [data, setData] = useState([]);
  console.log(data)
  const [loading, setLoading] = useState(false);
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

    <Box sx={{ bgcolor: "#F0F0F0", }}>
      <Layout setHover={setHover} />

      {/* <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center", p: 5 }}>
                <Link href={"/"}>
                    <IconButton aria-label="" >
                        <img src="/assets/ButtonBack.png" alt="" width={50} />
                    </IconButton></Link>

            </Stack> */}
      <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
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
        <Box sx={{ height: 691, position: "relative", }}>
          <img src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave?.file_path}`} alt="About Us" style={{ width: "100%", height: "100%", }} />

        </Box>

        <Typography

          color="white"
          fontSize={100}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "regular",
            textAlign: "center",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          {data[0]?.data[1]?._mave?.text}
        </Typography>

      </Box>
      <Box sx={{
        width: "90%",
        maxWidth: 1500, mx: "auto",
      }}>
         <Typography
         sx={{ fontWeight: "regular", fontSize: 16,textAlign: "justify", }}
            dangerouslySetInnerHTML={{ __html: data[0]?.data[2]?.value }}
          />
        {/* <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 30, py: 3,textAlign: "justify" }}>
          {data[0]?.data[2]?.value?.replace(/<[^>]+>/g, ''.replace(/&nbsp;/g, ' '))}
        </Typography> */}
       
        <Stack direction={"column"} py={2}>
          <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 40, }}>
            {data[1]?.data[0]?._mave?.title}
          </Typography>
          <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 16, }}>
            {data[1]?.data[0]?._mave?.altDescription?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}


          </Typography>
        
          {/* <Typography
            dangerouslySetInnerHTML={{ __html: data[1]?.data[0]?._mave?.description }}
          /> */}
          <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 16, }}>
            {data[1]?.data[0]?._mave?.description?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}

          </Typography>

        </Stack>
        <Testimonial data={data[1]?.data[1]?._mave?.cards} />
      </Box>

      <img src={`https://engine.uurotravels.com/${data[2]?.data[0]?._mave.file_path}`} height={807} width={"100%"} style={{ objectFit: "cover" }} />

      <Footer />
    </Box>
  )
}

export default about
