import IamgeCard from '@/components/IamgeCard'
import Layout from '@/components/Layout'
import { Box, Stack, Typography, Grid } from '@mui/material'
import Image from 'next/image'


const Home = () => {
  const data = [
    "Pro Team Mountaineering", "Date of Birth", "Date of Birth", "At Mammut since", "Uuro Travels",
    "One of the top Swiss speed climbers", "22 Feb 1984", "2011",
  ];
  return (
    <Box>
      <Layout />
      <Box>
        <img src={"/assets/banner.png"} height={950} width={"100%"} style={{ objectFit: "cover" }} />
      </Box>
      <Grid container spacing={3} p={3} mt={1}>
        {["1", "2", "3"].map((image) =>
          <Grid item lg={4}>
            <IamgeCard image={"/assets/Category-Study-(Hero-Banner).png"} />
          </Grid>)}

      </Grid>
      <Grid container spacing={1} p={3} mt={1} >
        <Grid item>
          
        </Grid>
      </Grid>


    </Box>
  )
}

export default Home
