import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useAuth } from 'providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [openImageUpload, setOpenImageUpload] = useState(false);

  const drawerWidth = 300;
  const onSignOut = async () => {
    try {
      await signOut();
      navigate('/sign-up');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#fff',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`
        }}
      >
        <Toolbar>
          <Button variant="contained" onClick={() => setOpenImageUpload(true)}>
            Upload Image
          </Button>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'flex-end'
            }}
          >
            <Avatar>{currentUser?.getInitials?.()}</Avatar>
            <Typography variant="h6" color="text.primary">
              {currentUser?.name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List sx={{ px: 4 }}>
          <ListItem
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.light,
              borderRadius: 10
            }}
          >
            <ListItemIcon>
              <HistoryIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: (theme) => theme.palette.secondary.contrastText
              }}
            >
              History
            </ListItemText>
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={onSignOut}
            >
              Sign Out
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          height: '100vh',
          mt: 10,
          px: 2
        }}
      >
        {children}
      </Box>
      <ImageUpload
        open={openImageUpload}
        onClose={() => setOpenImageUpload(false)}
      />
    </Box>
  );
}

export default Layout;
