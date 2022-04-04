import React, { useContext, useState } from 'react';
import {
  Snackbar,
  Alert,
  Slide,
  IconButton,
  AlertTitle,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const notificationContext = React.createContext({
  getData: () => {},
  pushNotification: () => {}
});

const useNotification = () => {
  return useContext(notificationContext);
};

const useNotificationProvider = () => {
  const [snackbarData, setSnackbarData] = useState({
    title: 'Not Available',
    description: '',
    severity: 'success',
    open: false,
    backgroundColor: ''
  });

  const handleClose = () => {
    setSnackbarData((prev) => ({ ...prev, open: false }));
  };

  const getData = () => {
    return { ...snackbarData, handleClose };
  };

  const pushNotification = (title, description, severity) => {
    // Add more custom colors if needed
    const backgroundColorMappings = {
      success: '#8FB020',
      error: '#D04437'
    };

    const backgroundColor = backgroundColorMappings[severity] ?? '#323232';

    setSnackbarData({
      title,
      description,
      severity,
      open: true,
      backgroundColor
    });
  };

  return {
    getData,
    pushNotification
  };
};

const NotificationProvider = ({ children }) => {
  const notifications = useNotificationProvider();

  const { title, description, severity, open, handleClose } =
    notifications.getData();

  return (
    <notificationContext.Provider value={notifications}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity={severity}
          icon={false}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
        >
          <AlertTitle>{title}</AlertTitle>
          <Typography variant="h6">{description}</Typography>
        </Alert>
      </Snackbar>
    </notificationContext.Provider>
  );
};

export { NotificationProvider, useNotification };
