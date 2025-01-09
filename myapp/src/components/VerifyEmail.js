import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Grid,
  styled,
  Avatar
} from '@mui/material';

// Styled components
const StepNumber = styled(Avatar)(({ theme, active }) => ({
  width: 32,
  height: 32,
  fontSize: '0.875rem',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? '#fff' : theme.palette.text.secondary,
  border: `1px solid ${active ? 'transparent' : theme.palette.divider}`,
}));

const StepText = styled(Typography)(({ theme, active }) => ({
  marginLeft: theme.spacing(1.5),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 500 : 400,
}));

const VerificationInput = styled(TextField)({
  width: '48px',
  height: '48px',
  '& input': {
    textAlign: 'center',
    fontSize: '1.25rem',
    padding: '8px',
  },
});

const VerifyEmail = ({ onVerificationComplete }) => {
    const location = useLocation();  
    const initialEmail = location.state?.email || 'mail@example.com';
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const navigate = useNavigate(); 

    const handleInput = (index, value) => {
      if (!/^[0-9]*$/.test(value)) return;
  
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
  
      if (value !== '' && index < 4) {
        inputRefs[index + 1].current.focus();
      }
    };
  
    const handleVerify = async () => {
      const otp = verificationCode.join('');
      try {
        const response = await axios.post('http://localhost:5000/api/users/verify', {
          email: initialEmail,
          otp
        });

        setError('');
        onVerificationComplete?.(response.data);
        
        // Navigate to the category page after successful verification
        navigate('/category'); // Update this path to your actual category page route
      } catch (error) {
        setError(error.response?.data.message || 'Error verifying OTP. Please try again.');
      }
    };
  
    const handleResend = async () => {
      try {
        await axios.post('http://localhost:5000/api/users/resend-otp', {
          email: initialEmail,
        });

        alert('New OTP sent successfully!');
      } catch (error) {
        setError(error.response?.data.message || 'Error resending code. Please try again.');
      }
    };

  const steps = [
    'EMAIL VERIFICATION',
    'CATEGORY',
    'ACCOUNT DETAILS',
   
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Paper sx={{ width: 280, p: 4, borderRadius: 0 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Avatar src="/api/placeholder/40/40" sx={{ width: 40, height: 40 }} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Anfra
          </Typography>
        </Box>

        <Stack spacing={3}>
          {steps.map((step, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <StepNumber active={index === 0}>
                {index + 1}
              </StepNumber>
              <StepText active={index === 0} variant="body2">
                {step}
              </StepText>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Box sx={{ flex: 1, p: 4 }}>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Verify email address
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Please check your email <strong>{initialEmail}</strong> <br /> 
            Enter the verification code below
          </Typography>

          <Grid container spacing={1} alignItems="center" sx={{ mb: 3 }}>
            {verificationCode.map((digit, index) => (
              <Grid item key={index}>
                <VerificationInput
                  inputRef={inputRefs[index]}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                  }}
                  value={digit}
                  onChange={(e) => handleInput(index, e.target.value)}
                />
              </Grid>
            ))}
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={handleVerify}
                sx={{ height: '48px', ml: 1 }}
              >
                NEXT
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Didn't receive it?
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={handleResend}
            >
              Resend code
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default VerifyEmail;