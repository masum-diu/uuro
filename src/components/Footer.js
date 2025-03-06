import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box 
        sx={{ 
          color: "white", 
          mt: 3, 
          backgroundImage: "url('/assets/footer.png')", 
           backgroundSize: "cover", 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center",  
          height:550,
          width:"100%",
            display:"flex", 
            justifyContent:"center",
            alignItems:"center",
        
        }} 
      >
        <Stack direction={"column"}  justifyContent={"center"} alignItems={"center"}  spacing={4} >
          <img src="/assets/Logo.png" alt="" width={236} />
          <Typography color="white" fontSize={60} fontWeight={"medium"}>
            Next up - Travel for Five Generation
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Typography fontSize={20} fontWeight={"bold"} color="white">About Us</Typography>
            <Typography fontSize={20} fontWeight={"bold"} color="white">Terms & Conditions</Typography>
            <Typography fontSize={20} fontWeight={"bold"} color="white">Contact Us</Typography>
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <Typography fontSize={25} fontWeight={"bold"} color="white">Mail: info@uuro.com</Typography>
            <Typography fontSize={25} fontWeight={"bold"} color="white">Phone: +880 1700000000</Typography>
            <Typography fontSize={20} fontWeight={"bold"} color="white">Contact Us</Typography>
          </Stack>
        </Stack>
      </Box>
      
    )
}

export default Footer
