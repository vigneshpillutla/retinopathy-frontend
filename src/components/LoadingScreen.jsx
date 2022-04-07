import React from 'react';
import { Modal, CircularProgress, Backdrop } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';

function LoadingScreen() {
  const { loading } = useAuth();
  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress
        sx={{ position: 'absolute', top: '50%', left: '50%' }}
        size={50}
      />
    </Backdrop>
  );
}

export default LoadingScreen;
