import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip
} from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { getData, getImages } from 'utils/firebaseUtils';
import Layout from './Layout';
import HistoryIcon from '@mui/icons-material/History';

function Home() {
  const { currentUser, loading, userImages } = useAuth();
  const navigate = useNavigate();

  const SeverityResult = (props) => {
    const { imageURL, severity } = props;

    return (
      <Card sx={{ maxWidth: 345, width: '30%' }}>
        <CardMedia component="img" height="200" image={imageURL} alt="" />
        <CardContent>
          <Chip size="large" color="error" label={severity} />
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/sign-in');
    }
  }, [loading]);

  return (
    <Layout>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <HistoryIcon fontSize="large" />
        <Typography variant="h3">Your History</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {userImages &&
          Object.values(userImages).map((image) => (
            <SeverityResult {...image} />
          ))}
      </Box>
    </Layout>
  );
}

export default Home;
