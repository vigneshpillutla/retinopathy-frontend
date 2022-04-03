import React from 'react';
import { getApp, getApps } from 'firebase/app';
import { Typography } from '@mui/material';

function Home() {
  const app = getApp();
  return (
    <div>
      <Typography variant="h2">Home</Typography>
    </div>
  );
}

export default Home;
