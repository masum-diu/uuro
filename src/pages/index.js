import React from 'react'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'


const Home = () => {
  return (
    <div>
      <AppBar position="fixed" color="background2">
        <Toolbar>
          <Typography variant="h6" className='light'>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="body1" className='exterBold' color="initial" mt={10}>
      Helvetica Neue 500
      </Typography>
    </div>
  )
}

export default Home
