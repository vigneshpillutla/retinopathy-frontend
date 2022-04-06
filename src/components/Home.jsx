import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';

function Home() {
  const { currentUser, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [openImageUpload, setOpenImageUpload] = useState(false);

  const onSignOut = async () => {
    try {
      await signOut();
      navigate('/sign-up');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/sign-in');
    }
  }, [loading]);
  return (
    <div>
      <Typography variant="h2">Home</Typography>
      <Button onClick={onSignOut}>Sign Out</Button>
      <Button onClick={() => setOpenImageUpload(true)}>Upload Image</Button>
      <ImageUpload
        open={openImageUpload}
        onClose={() => setOpenImageUpload(false)}
      />
    </div>
  );
}

export default Home;
