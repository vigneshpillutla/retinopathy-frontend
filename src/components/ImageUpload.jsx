import { Dialog, Box, Button, Typography } from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import { useNotification } from 'providers/NotificationsProvider';
import React, { useEffect, useRef, useState } from 'react';
import { uploadImage, updateData, getSeverity } from 'utils/firebaseUtils';

function ImageUpload(props) {
  const { open, onClose } = props;
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const fileUploadRef = useRef();
  const { pushNotification } = useNotification();
  const { currentUser, setLoading } = useAuth();

  useEffect(() => {
    showImage();
  }, [JSON.stringify(file)]);

  async function showImage() {
    if (!file || imageURL) return;
    try {
      setLoading(true);
      const url = await uploadImage(file);
      setImageURL(url);
    } catch {
      pushNotification('Failed to upload image', '', 'error');
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  const saveImage = async () => {
    try {
      setLoading(true);
      const res = await getSeverity(imageURL);
      const severity = res.data?.severity;
      if (!severity) throw new Error('Could not predict severity');
      await updateData(
        `users/${currentUser.uid}/images`,
        { imageURL, severity },
        'push'
      );
      pushNotification('Uploaded the image', '', 'success');
    } catch (error) {
      console.log(error);
      pushNotification('Could not save the image', 'Try again later', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { height: '90%', maxHeight: 'md' }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          gap: 1,
          p: 6
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            border: '2px dashed',
            borderColor: 'text.secondary',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          {imageURL ? (
            <img
              src={imageURL}
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'contain'
              }}
            />
          ) : (
            <>
              <Typography variant="h4" color="text.secondary">
                Drag your image here
              </Typography>
              <Typography variant="h5" color="text.secondary">
                or
              </Typography>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => fileUploadRef.current.click()}
              >
                Browse
              </Button>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                title=""
                value=""
                style={{ display: 'none' }}
                ref={fileUploadRef}
                onChange={handleFileChange}
              />
            </>
          )}
        </Box>
        <Button
          sx={{ width: 100 }}
          variant="contained"
          color="secondary"
          onClick={saveImage}
          disabled={!imageURL}
        >
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}

export default ImageUpload;
