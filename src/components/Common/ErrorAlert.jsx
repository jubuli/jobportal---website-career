import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearError } from '../../store/jobSlice';

const ErrorAlert = ({ error, onRetry }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearError());
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
    handleClose();
  };

  return (
    <Box mb={2}>
      <Alert
        severity="error"
        action={
          <Box>
            {onRetry && (
              <Button color="inherit" size="small" onClick={handleRetry}>
                Retry
              </Button>
            )}
            <Button color="inherit" size="small" onClick={handleClose}>
              Dismiss
            </Button>
          </Box>
        }
      >
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;