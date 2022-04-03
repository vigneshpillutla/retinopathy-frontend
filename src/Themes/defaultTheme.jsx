import { createTheme } from '@mui/material/styles';

const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: '#00ACB1',
      dark: '#005963',
      light: '#57CCC3',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#FD556D',
      contrastText: '#FFF'
    },
    text: {
      primary: '#3A3A3A',
      secondary: '#686A6F'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial",sans-serif',
    allVariants: {
      color: '#3A3A3A'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          height: '100vh'
        }
      }
    }
  }
});

export default DefaultTheme;
