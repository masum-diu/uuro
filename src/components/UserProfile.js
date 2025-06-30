import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserProfile = ({ user, loading, fetchSingleDataevent }) => {
  const [editMode, setEditMode] = useState(false);
  const [loadingState, setLoadingState] = useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.user?.image || '');
  const [formData, setFormData] = useState({
    name: user?.user?.name || '',
    email: user?.user?.email || '',
    phone: user?.user?.phone || '',
  });

  // Update form data when edit mode is triggered
  useEffect(() => {
    if (editMode && user?.user) {
      setFormData({
        name: user.user.name || '',
        email: user.user.email || '',
        phone: user.user.phone || '',
      });
      setPreview(user.user.image || '');
    }
  }, [editMode, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png','image/jpg']; 
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG and PNG formats are supported.');
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  }
};


  const handleSave = async () => {
    try {
      setLoadingState(true)
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      if (imageFile) {
        form.append('image', imageFile);
      }

      const response = await axios.post(`https://upackage.etherstaging.xyz/api/user`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      setLoadingState(false)
      toast.success('Profile updated successfully!');
      fetchSingleDataevent()
      setEditMode(false);
      // Optionally reload user info here
    } catch (error) {
      toast.error('Failed to update profile');
       setLoadingState(false)
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      name: user.user.name || '',
      email: user.user.email || '',
      phone: user.user.phone || '',
    });
    setPreview(user.user.image || '');
    setImageFile(null);
  };

  return (
    <Container sx={{ mt: 3 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            flexDirection: "column",
          }}
        >
          <BeatLoader color="#191919" size={30} />
        </Box>
      ) : (
        <Card sx={{ bgcolor: !editMode ? '#585864' : '', color: '#fff' }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={imageFile ? preview : user?.user?.image}
                alt={formData.name}
                sx={{
                  width: '100%',
                  maxWidth: '100px',
                  mx: 'auto',
                  height: 100,
                  mb: 2,
                  objectFit: 'cover',
                }}
              />

              {editMode && (
                <TextField
                  type="file"
                  accept="image/*"
                  fullWidth
                  onChange={handleImageChange}
                  sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
                  InputLabelProps={{ shrink: true }}
                />
              )}

              {editMode ? (
                <Box width="100%">
                  <TextField
                    fullWidth
                    label="According to your passport"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ mb: 2, backgroundColor: '#fff' }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ mb: 2, backgroundColor: '#fff' }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Number with country code"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{ mb: 2, backgroundColor: '#fff' }}
                    size="small"
                  />

                  <Stack direction="row" spacing={2} justifyContent="center">
                    {loadingState ? <BeatLoader color="#191919" size={30} /> : <Button fullWidth variant="contained" onClick={handleSave}>
                      Save
                    </Button>}
                    <Button fullWidth variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <>
                  <Typography className="bold" fontSize={22}>
                    {user?.user?.name}
                  </Typography>
                  <Typography className="Medium" fontSize={16}>
                    {user?.user?.email}
                  </Typography>
                  <Typography className="Regular" fontSize={12}>
                    {user?.user?.phone}
                  </Typography>

                  <IconButton
                    aria-label="edit"
                    onClick={() => setEditMode(true)}
                    sx={{ mt: 2, color: '#fff' }}
                  >
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default UserProfile;
