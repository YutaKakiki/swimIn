import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#001e43',
    },
    secondary: {
      main: '#fafafa',
    },
    info: {
      main: '#00ad28',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#001e43',
          color: 'whitesmoke',
          fontWeight: 'bold',
          fontSize: '16px',
        },
        arrow: {
          color: '#001e43',
        },
      },
    },
  },
})

export default theme
