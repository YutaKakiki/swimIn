import { Card, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useSleepState } from '@/app/hooks/useGrobalState'

const SleepStatus = () => {
  const [sleep] = useSleepState()
  const formettedTargetWake = dayjs(sleep.targetWake).format('HH:mm')
  return (
    <Card
      sx={{
        position: 'relative',
        height: '150px',
        width: '170px',
        bgcolor: '#adc5f7',
      }}
    >
      <Stack spacing={2}>
        <Typography
          textAlign={'center'}
          sx={{ mt: '30px', fontWeight: 'bold', fontSize: '20px' }}
        >
          睡眠中
        </Typography>
        <Typography textAlign={'center'} sx={{ mt: '30px' }}>
          起床目標
        </Typography>
        <Typography textAlign={'center'}>{formettedTargetWake}</Typography>
      </Stack>
    </Card>
  )
}

export default SleepStatus
