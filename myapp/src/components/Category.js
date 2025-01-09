import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
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

const Category = () => {
  const navigate = useNavigate();

  const steps = [
    'EMAIL VERIFICATION',
    'CATEGORY',
    'ACCOUNT DETAILS',
   
  ];

  const handleSelection = (accountType) => {
    console.log(`Selected account type: ${accountType}`);
    navigate('/account-details');
  };

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
              <StepNumber active={index === 1}> {/* Step 2 Active */}
                {index + 1}
              </StepNumber>
              <StepText active={index === 1} variant="body2">
                {step}
              </StepText>
            </Box>
          ))}
        </Stack>
      </Paper>
      <Box sx={{ flex: 1, p: 4 }}>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Choose account type
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Your email confirmed! <br /> 
            Let's select your account type and go to the next step
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={() => handleSelection('PERSONAL')}>
                PERSONAL
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={() => handleSelection('BUSINESS')}>
                BUSINESS
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Category;
