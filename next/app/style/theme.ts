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
  },
})

export default theme
