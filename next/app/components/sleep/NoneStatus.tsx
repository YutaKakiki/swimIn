import { Card, Stack, Typography } from '@mui/material'
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
        <Typography
          textAlign={'center'}
          sx={{ mt: '30px', fontWeight: 'bold', fontSize: '20px' }}
        >
          起床中
        </Typography>
        <Typography textAlign={'center'}>
          今日からSwimInで友達と繋がりましょう!
        </Typography>
      </Stack>
    </Card>
  )
}

export default NoneStatus
