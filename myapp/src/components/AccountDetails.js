import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  styled,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Home, Person, Visibility, VisibilityOff } from '@mui/icons-material';

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

function AccountDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const initialFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    gender: 'male',
    dateOfBirth: {
      date: '',
      month: '',
      year: '',
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState(null);

  const steps = [
    { id: 1, title: 'EMAIL VERIFICATION', completed: true },
    { id: 2, title: 'CATEGORY', completed: true },
    { id: 3, title: 'ACCOUNT DETAILS', active: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData(initialFormData); // Clear the form after submission
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Paper sx={{ width: 280, p: 4, borderRadius: 0 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>A</Avatar>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Anfra
          </Typography>
        </Box>

        <Stack spacing={3}>
          {steps.map((step) => (
            <Box key={step.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <StepNumber active={step.active}>{step.id}</StepNumber>
              <StepText active={step.active} variant="body2">
                {step.title}
              </StepText>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<Person size={20} />}
            sx={{ mb: 4 }}
            color="inherit"
          >
            BACK TO PREVIOUS
          </Button>

          <Typography variant="h4" sx={{ mb: 1 }}>
            Account details
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Enter some of your information & secure password to go next step!
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <TextField
                  label="FIRST NAME"
                  placeholder="e.g. Robert"
                  fullWidth
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <TextField
                  label="LAST NAME"
                  placeholder="e.g. Smith"
                  fullWidth
                  required
                  error={!formData.lastName}
                  helperText={!formData.lastName && 'This field is required!'}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </Box>

              <TextField
                label="PHONE NUMBER"
                placeholder="e.g. 000 0000 0000"
                fullWidth
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <Box>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  DATE OF BIRTH
                </FormLabel>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                  <Select
                    value={formData.dateOfBirth.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: {
                          ...formData.dateOfBirth,
                          date: e.target.value,
                        },
                      })
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Date</MenuItem>
                    {Array.from({ length: 31 }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={formData.dateOfBirth.month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: {
                          ...formData.dateOfBirth,
                          month: e.target.value,
                        },
                      })
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Month</MenuItem>
                    {[
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ].map((month, i) => (
                      <MenuItem key={i} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={formData.dateOfBirth.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: {
                          ...formData.dateOfBirth,
                          year: e.target.value,
                        },
                      })
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Year</MenuItem>
                    {Array.from({ length: 100 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Box>

              <FormControl variant="outlined">
                <FormLabel>PASSWORD</FormLabel>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8+ Characters"
                  fullWidth
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility size={20} />
                        ) : (
                          <VisibilityOff size={20} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>GENDER</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>

              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  NEXT STEP
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Details Section */}
          {submittedData && (
            <Paper sx={{ mt: 4, p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Submitted Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Name"
                    secondary={`${submittedData.firstName} ${submittedData.lastName}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Phone"
                    secondary={submittedData.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Date of Birth"
                    secondary={`${submittedData.dateOfBirth.date} ${submittedData.dateOfBirth.month} ${submittedData.dateOfBirth.year}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gender"
                    secondary={submittedData.gender}
                  />
                </ListItem>
              </List>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default AccountDetails;
