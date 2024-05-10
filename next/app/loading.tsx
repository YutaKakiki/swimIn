import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <>
      <Box sx={{ display: 'flex', mt: '300px', justifyContent: 'center' }}>
        <CircularProgress size={100} />
      </Box>
    </>
  )
}

export default Loading
