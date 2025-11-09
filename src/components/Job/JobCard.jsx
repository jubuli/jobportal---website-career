
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Business,
  AttachMoney,
  Schedule,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: '16px',
        marginTop: 5,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(202, 190, 190, 0.85)',
        transition: 'all 0.5s ease',

        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      }}
    >

      <Box
        sx={{
          height: 6,
          background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
        }}
      />

      <CardContent sx={{ p: 3 }}>

        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, color: '#0d47a1' }}
            >
              {job.title}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Business fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {job.company}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {job.location}
              </Typography>
            </Box>
          </Box>

          <Chip
            label={job.type}
            sx={{
              fontWeight: 600,
              borderRadius: '8px',
              backgroundColor:
                job.type === 'Full-time'
                  ? '#E3F2FD'
                  : job.type === 'Part-time'
                    ? '#F3E5F5'
                    : '#F5F5F5',
              color:
                job.type === 'Full-time'
                  ? '#1976d2'
                  : job.type === 'Part-time'
                    ? '#9c27b0'
                    : '#616161',
            }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />


        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          {job.requirements.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              sx={{
                borderRadius: '6px',
                backgroundColor: '#E3F2FD',
                color: '#0d47a1',
                fontWeight: 500,
              }}
            />
          ))}
          {job.requirements.length > 3 && (
            <Chip
              label={`+${job.requirements.length - 3} more`}
              size="small"
              sx={{
                backgroundColor: '#E0E0E0',
                color: '#424242',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            />
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoney fontSize="small" color="success" />
              <Typography variant="body2" color="success.main" fontWeight={600}>
                {job.salary}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Schedule fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatDate(job.postedDate)}
              </Typography>
            </Box>
          </Box>

          <Button
            component={Link}
            to={`/job/${job.id}`}
            variant="contained"
            size="small"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 3.5,
              py: 0.7,
              marginLeft: 2,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1565c0, #1e88e5)',
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
