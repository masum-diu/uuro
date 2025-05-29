import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const UserProfile = ({user,loading}) => {


  return (
    <Container  sx={{ mt: 3, }}>
      {
        loading ? <BeatLoader color="#191919" size={30} /> : <Card sx={{ bgcolor: "#585864" }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" color={"#fff"}>
              <Avatar src={user?.user?.image} alt={user?.user?.image} sx={{ width: "100%", maxWidth: "100px", mx: "auto", height: 100, mb: 2, objectFit: "cover" }} />
              <Typography className='bold'  fontSize={22}>{user?.user?.name}</Typography>
              <Typography className='Medium' fontSize={16} >{user?.user?.email}</Typography>
              <Typography className='Regular' fontSize={12} >{user?.user?.phone}</Typography>
            </Box>

          </CardContent>
        </Card>
      }
    </Container>
  );
};

export default UserProfile;
