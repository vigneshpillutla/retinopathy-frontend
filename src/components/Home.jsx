import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CardActions,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  DialogActions
} from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { updateData } from 'utils/firebaseUtils';
import Layout from './Layout';
import HistoryIcon from '@mui/icons-material/History';
import { useNotification } from 'providers/NotificationsProvider';

const SeverityResult = (props) => {
  const { imageURL, severity, openDialog } = props;
  const { severityLabels } = useAuth();

  if (severityLabels.length === 0) return null;

  return (
    <Card sx={{ maxWidth: 345, width: '30%' }}>
      <CardMedia component="img" height="200" image={imageURL} alt="" />
      <CardContent>
        <Chip size="large" color="error" label={severityLabels[severity]} />
      </CardContent>
      <CardActions>
        <Button onClick={openDialog}>Rectify</Button>
      </CardActions>
    </Card>
  );
};

const RectifyDialog = (props) => {
  const { open, onClose, selectedSeverity, setSelectedSeverity, imageId } =
    props;
  const { severityLabels } = useAuth();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose(selectedSeverity, imageId);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Change Predicted Severity</DialogTitle>
      <List>
        {severityLabels.map((severity, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => setSelectedSeverity(index)}
                checked={index === selectedSeverity}
              />
            }
          >
            <ListItemText primary={severity} />
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

function Home() {
  const { currentUser, loading, userImages } = useAuth();
  const navigate = useNavigate();
  const { pushNotification } = useNotification();
  const defaultDialogData = {
    open: false,
    imageId: '',
    severity: 0,
    setSelectedSeverity: () => {}
  };
  const [dialogData, setDialogData] = useState(defaultDialogData);
  const imageIds = Object.keys(userImages ?? {});

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/sign-in');
    }
  }, [loading]);

  const onSeverityRectify = (rectifiedSeverity, imageId) => {
    if (imageId) {
      updateData(
        `rectify/${imageId}`,
        {
          ...userImages[imageId],
          severity: rectifiedSeverity
        },
        'replace'
      );

      pushNotification(
        'Response Recorded!',
        'Thank you for your input.',
        'success'
      );
    }
    setDialogData(defaultDialogData);
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <HistoryIcon fontSize="large" />
        <Typography variant="h3">Your History</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {userImages &&
          Object.values(userImages).map((image, index) => (
            <SeverityResult
              key={index}
              {...image}
              openDialog={() =>
                setDialogData({
                  open: true,
                  selectedSeverity: parseInt(image.severity),
                  imageId: imageIds[index],
                  setSelectedSeverity: (newSeverity) =>
                    setDialogData((prev) => ({
                      ...prev,
                      selectedSeverity: newSeverity
                    }))
                })
              }
            />
          ))}
      </Box>
      <RectifyDialog onClose={onSeverityRectify} {...dialogData} />
    </Layout>
  );
}

export default Home;
