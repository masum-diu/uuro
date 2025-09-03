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
        minHeight: { xs: "auto", lg: 550 },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 4, lg: 0 },
        px: { xs: 2, lg: 0 }
      }}
    >
      <Stack 
        direction="column" 
        justifyContent="center" 
        alignItems={{ lg: "center", xs: "flex-start" }} 
        spacing={{ xs: 3, lg: 5 }}
        sx={{ 
          width: "100%",
          maxWidth: "1200px",
          px: { xs: 2, lg: 0 }
        }}
      >
        {/* Logo */}
        <Box sx={{ 
          width: { xs: "150px", lg: "236px" },
          height: "auto",
          alignSelf: { xs: "center", lg: "center" }
        }}>
          <img 
            src="/assets/Logo.png" 
            alt="Company Logo" 
            style={{ width: "100%", height: "auto" }} 
          />
        </Box>

        {/* Tagline */}
        <Typography 
          color="white" 
          fontSize={{ lg: 60, xs: 24 }} 
          className='Medium'
           fontWeight={500}
          textAlign={{ xs: "center", lg: "center" }}
          sx={{ 
            width: "100%",
            lineHeight: { xs: 1.3, lg: 1.2 },
            px: { xs: 1, lg: 0 }
          }}
        >
          Next up - Travel for Five Generation
        </Typography>

        {/* Links Row 1 */}
        <Stack 
          direction={{ lg: "row", xs: "column" }} 
          spacing={{ xs: 1.5, lg: 2 }} 
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <Link href="/about" passHref>
            <Typography 
              fontSize={{ lg: 20, xs: 16 }} 
              className='bold' 
               fontWeight={700}
              sx={{ 
                cursor: "pointer",
                '&:hover': { textDecoration: "underline" },
                px: { xs: 1, lg: 0 }
              }} 
              color="white"
            >
              About Us
            </Typography>
          </Link>

          <Link href="/termsConditions" passHref>
            <Typography 
              fontSize={{ lg: 20, xs: 16 }} 
              className='bold' 
               fontWeight={700}
              sx={{ 
                cursor: "pointer",
                '&:hover': { textDecoration: "underline" },
                px: { xs: 1, lg: 0 }
              }} 
              color="white"
            >
              Terms & Conditions
            </Typography>
          </Link>

          <Link href="/privacyPolicy" passHref>
            <Typography 
              fontSize={{ lg: 20, xs: 16 }} 
              className='bold' 
               fontWeight={700}
              sx={{ 
                cursor: "pointer",
                '&:hover': { textDecoration: "underline" },
                px: { xs: 1, lg: 0 }
              }} 
              color="white"
            >
              Privacy Policy
            </Typography>
          </Link>
        </Stack>

        {/* Links Row 2 */}
        <Stack 
          direction={{ lg: "row", xs: "column" }} 
          spacing={{ xs: 1.5, lg: 2 }}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <Link href="/refundPolicy" passHref>
            <Typography 
              fontSize={{ lg: 20, xs: 16 }} 
              className='bold' 
               fontWeight={700}
              sx={{ 
                cursor: "pointer",
                '&:hover': { textDecoration: "underline" },
                px: { xs: 1, lg: 0 }
              }} 
              color="white"
            >
              Refund Policy
            </Typography>
          </Link>

          <Link href="/contact" passHref>
            <Typography 
              fontSize={{ lg: 20, xs: 16 }} 
              className='bold' 
               fontWeight={700}
              sx={{ 
                cursor: "pointer",
                '&:hover': { textDecoration: "underline" },
                px: { xs: 1, lg: 0 }
              }} 
              color="white"
            >
              Contact Us
            </Typography>
          </Link>
        </Stack>

        {/* Contact Info and Social Media */}
        <Stack 
          direction={{ lg: "row", xs: "column" }} 
          spacing={{ xs: 2, lg: 5 }}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography 
            fontSize={{ lg: 25, xs: 16 }} 
            className='bold' 
             fontWeight={700}
            color="white"
            textAlign="center"
          >
            Mail: info@uuro.com
          </Typography>
          
          <Typography 
            fontSize={{ lg: 25, xs: 16 }} 
            className='bold' 
            fontWeight={700}
            color="white"
            textAlign="center"
          >
            Phone: +880 1700000000
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
            justifyContent="center"
            sx={{ width: { xs: "100%", lg: "auto" } }}
          >
            {['facebook', 'instagram', 'whatsapp', 'twitter', 'play'].map((social) => (
              <IconButton 
                key={social} 
                aria-label={social} 
                sx={{ 
                  p: { xs: 0.5, lg: 1 },
                  '&:hover': { transform: "scale(1.1)" }
                }}
              >
                <img 
                  src={`/assets/${social} 1.png`} 
                  width={30} 
                  alt={`${social} icon`} 
                  style={{ width: "100%", height: "auto", maxWidth: "30px" }}
                />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer