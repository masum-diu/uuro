import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <Box sx={{ width: "1500px", margin: "0 auto", maxWidth: "90%" }}>
            <AppBar position="fixed" color="background2">
                <Toolbar sx={{
                    width: "90%",
                    maxWidth: "1500px",
                    margin: "0 auto",
                    padding: "0px",
                    '@media (min-width: 600px)': {
                        paddingLeft: '0px',
                        paddingRight: '0px',
                    },
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    mb: 5

                }}>
                    <Typography variant="h6" className='light' fontSize={25}>
                        Home
                    </Typography>
                    <Typography variant="h6" className='light' fontSize={25}>
                        Study Abroad
                    </Typography>
                    <Typography variant="h6" className='light' fontSize={25}>
                        Tour Packages Inbound

                    </Typography>
                    <Typography variant="h6" className='light' fontSize={25}>
                        Visit Visa
                    </Typography>
                </Toolbar>


            </AppBar>
            <Stack direction={"row"} justifyContent={"center"}>
                <img src="/assets/Navbar.png" width={200} alt=""  />
            </Stack>
            {children}
        </Box>
    )
}

export default Layout
