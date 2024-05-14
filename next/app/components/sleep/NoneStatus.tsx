import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, Card, Stack, Typography } from '@mui/material'

import React from 'react'

const NoneStatus = () => {
  return (
    <Card
      sx={{
        position: 'relative',
        height: '150px',
        width: '170px',
        bgcolor: '#a3f0b7',
      }}
    >
      <Stack spacing={0.2} sx={{ mt: '10px' }}>
        <Box
          sx={{
            width: '100px',
            pt: '6px',
            pl: '34px',
          }}
        >
          <Typography
            textAlign={'center'}
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              border: '2px solid',
              borderColor: '#04c92e',
              borderRadius: '10px',
              p: 1,
              bgcolor: '#6ef58b',
              display: 'flex',
              justifyContent: 'center',
              color: '#ff6600',
            }}
          >
            <LightModeIcon />
            起床中
          </Typography>
        </Box>
        <Typography
          textAlign={'center'}
          fontWeight={'bold'}
          sx={{ pt: '10px' }}
        >
          SwimInで
        </Typography>
        <Typography textAlign={'center'} fontWeight={'bold'}>
          繋がりましょう！
        </Typography>
      </Stack>
    </Card>
  )
}

export default NoneStatus
