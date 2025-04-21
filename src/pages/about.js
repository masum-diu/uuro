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
                <img src={`https://engine.uurotravels.com/${data[0]?.data[0]?._mave.file_path}`} alt="About Us" width="100%" style={{maxHeight:"691px",objectFit:'cover'}}/>

                <Typography

                    color="white"
                    fontSize={120}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontWeight: "regular",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                    }}
                >
                   {data[0]?.data[1]?._mave?.text}
                </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
                <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 40, py: 2 }}>
                {data[0]?.data[2]?.value?.replace(/<[^>]+>/g, '')}
                </Typography>
                <Stack direction={"column"} py={3}>
                    <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 60, }}>
                    {data[1]?.data[0]?._mave?.title}
                    </Typography>
                    <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 25, }}>
                    {data[1]?.data[0]?._mave?.altDescription?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}


                    </Typography>
                    <Typography color="initial" sx={{ fontWeight: "regular", fontSize: 25, }}>
                    {data[1]?.data[0]?._mave?.description?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}

                    </Typography>

                </Stack>
                <Testimonial data={data[1]?.data[1]?._mave?.cards} />
                <img src={`https://engine.uurotravels.com/${data[2]?.data[0]?._mave.file_path}`} height={807} width={"100%"} style={{ objectFit: "cover" }} />

            </Box>
            <Footer />
        </Box>
    )
}

export default about
