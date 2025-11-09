



import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDetails, clearCurrentJob } from '../store/jobSlice';
import {
  LocationOn,
  Business,
  AttachMoney,
  Schedule,
  ArrowBack,
} from '@mui/icons-material';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorAlert from '../components/Common/ErrorAlert';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentJob, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobDetails(id));
    return () => dispatch(clearCurrentJob());
  }, [dispatch, id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (loading && !currentJob)
    return <LoadingSpinner message="Loading job details..." />;

  if (error)
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ErrorAlert error={error} onRetry={() => dispatch(fetchJobDetails(id))} />
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Jobs
        </Button>
      </Container>
    );

  if (!currentJob)
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Job not found
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Jobs
        </Button>
      </Container>
    );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >

      <Breadcrumbs sx={{ mb: { xs: 2, sm: 3 } }}>
        <Link component={RouterLink} to="/" color="inherit">
          Jobs
        </Link>
        <Typography color="text.primary" noWrap>
          {currentJob.title}
        </Typography>
      </Breadcrumbs>

   
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '0.8rem', sm: '1rem' },
        }}
      >
        Back to Jobs
      </Button>

      
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.95)',
        }}
      >
        {/* Header */}
        <Box
          mb={4}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            {currentJob.title}
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            gap={1.5}
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <Business color="action" />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {currentJob.company}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <LocationOn color="action" />
              <Typography variant="body2">{currentJob.location}</Typography>
            </Box>

            <Chip
              label={currentJob.type}
              color={
                currentJob.type === 'Full-time'
                  ? 'primary'
                  : currentJob.type === 'Part-time'
                  ? 'secondary'
                  : 'default'
              }
              sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}
            />

            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoney color="success" />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'success.main' }}
              >
                {currentJob.salary}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            alignItems="center"
            gap={0.5}
          >
            <Schedule color="action" />
            <Typography variant="body2" color="text.secondary">
              Posted on {formatDate(currentJob.postedDate)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Content Section */}
        <Grid container spacing={4}>
          {/* Left Column - Description */}
          <Grid item xs={12} md={8}>
            <Box mb={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, color: 'primary.dark' }}
              >
                Job Description
              </Typography>
              <Typography variant="body1" paragraph>
                {currentJob.description}
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, color: 'primary.dark' }}
              >
                Requirements
              </Typography>
              <Box
                display="flex"
                gap={1}
                flexWrap="wrap"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                {currentJob.requirements.map((req, index) => (
                  <Chip
                    key={index}
                    label={req}
                    color="primary"
                    variant="outlined"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Apply Box */}
          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 2, sm: 3 },
                position: { md: 'sticky' },
                top: 20,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, textAlign: { xs: 'center', md: 'left' } }}
              >
                Quick Apply
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                paragraph
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
              >
                Interested in this position? Apply directly through the company’s website.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                href={currentJob.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0, #1e88e5)',
                  },
                }}
              >
                Apply Now
              </Button>

              <Box mt={2} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="body2" color="text.secondary">
                  Application will open in a new window
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobDetails;
