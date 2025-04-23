import { Box, Stack, Typography, IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <Box
      sx={{
        color: "white",
        backgroundImage: "url('/assets/Footer.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: 550,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <Stack direction={"column"} justifyContent={{ lg: "center", xs: "flex-start" }} alignItems={{ lg: "center", xs: "flex-start" }} spacing={5} >
        <img src="/assets/Logo.png" alt="" width={236} />
        <Typography color="white" fontSize={{ lg: 60, xs: 20 }} className='Medium'>
          Next up - Travel for Five Generation
        </Typography>
        <Stack direction={{ lg: "row", xs: "column" }} spacing={2} >
          <Link href="/about" passHref>
            <Typography fontSize={{ lg: 20, xs: 14 }} className='bold' sx={{ cursor: "pointer" }} color="white">
              About Us
            </Typography>
          </Link>

          <Link href="/termsConditions" passHref>
            <Typography fontSize={{ lg: 20, xs: 14 }} className='bold' sx={{ cursor: "pointer" }} color="white">
              Terms & Conditions
            </Typography>
          </Link>
          <Link href="/privacyPolicy" passHref>
            <Typography fontSize={{ lg: 20, xs: 14 }} className='bold' sx={{ cursor: "pointer" }} color="white">
              Privacy Policy
            </Typography>
          </Link>
        

        </Stack>
        <Stack direction={{ lg: "row", xs: "column" }} spacing={2} >
        <Link href="/refundPolicy" passHref>
            <Typography fontSize={{ lg: 20, xs: 14 }} className='bold' sx={{ cursor: "pointer" }} color="white">
              Refund Policy
            </Typography>
          </Link>
          <Link href="/contact" passHref>
            <Typography fontSize={{ lg: 20, xs: 14 }} className='bold' sx={{ cursor: "pointer" }} color="white">
              Contact Us
            </Typography>
          </Link>

        </Stack>
        <Stack direction={{ lg: "row", xs: "column" }} spacing={{ lg: 5, xs: 2 }} >
          <Typography fontSize={{ lg: 25, xs: 14 }} className='bold' color="white">Mail: info@uuro.com</Typography>
          <Typography fontSize={{ lg: 25, xs: 14 }} className='bold' color="white">Phone: +880 1700000000</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"} >
            <IconButton aria-label="" >
              <img src="/assets/facebook 1.png" width={30} alt="" />
            </IconButton>
            <IconButton aria-label="" >
              <img src="/assets/instagram 1.png" width={30} alt="" />
            </IconButton>

            <IconButton aria-label="" >
              <img src="/assets/whatsapp 1.png" width={30} alt="" />
            </IconButton>
            <IconButton aria-label="" >
              <img src="/assets/twitter 1.png" width={30} alt="" />
            </IconButton>
            <IconButton aria-label="" >
              <img src="/assets/play 1.png" width={30} alt="" />
            </IconButton>



          </Stack>
        </Stack>
      </Stack>
    </Box>

  )
}

export default Footer
