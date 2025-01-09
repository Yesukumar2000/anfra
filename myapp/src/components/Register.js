import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');

    const navigate = useNavigate();

 // Update Register.js to Redirect After Email Submission
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await axios.post('http://localhost:5000/api/users/register', { email }, {
          headers: { 'Content-Type': 'application/json' }});
        alert('OTP sent to your email!');
        navigate('/verify', { state: { email } }); 
        console.log("data",data)
        
    } catch (error) {
        alert(error.response?.data?.message || 'Error registering email');
    }
};


  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          display: { xs: 'none', md: 'block' },
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
          color: 'white',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        />
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            Anfra
          </Typography>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h2" component="div" sx={{ mb: 2 }}>
              "
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              RONNA E. GOMEZ
            </Typography>
            <Typography variant="body2">
              CEO, GOOGLE
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {isMobile && (
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                Anfra
              </Typography>
            )}
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="body2" sx={{ display: 'inline' }}>
                Already have an account?{' '}
              </Typography>
              <Link href="#" underline="none" sx={{ fontWeight: 'bold' }}>
                Log in now!
              </Link>
            </Box>
          </Box>

          <Box sx={{ my: 8 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Let's go!
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Join with our Platform
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Enter your valid email address and complete some easy steps for register your account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="e.g. mail@gmail.com"
                variant="outlined"
                label="EMAIL ADDRESS"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                LET'S START
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Register;