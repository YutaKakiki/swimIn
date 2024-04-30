import { Card, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useSleepState } from '@/app/hooks/useGrobalState'

const WakeStatus = () => {
  const [sleep] = useSleepState()
  const sleepTime = dayjs(sleep.actualWake).diff(sleep.bedtime, 'minute')
  const formattedSleepTime = dayjs
    .duration(sleepTime, 'minute')
    .format('HH時間mm分')
  const diffTime = dayjs(sleep.actualWake).diff(sleep.targetWake, 'minute')
  const formattedDiffTime = dayjs
    .duration(Math.abs(diffTime), 'minute')
    .format('HH時間mm分')
  return (
    <Card
      sx={{
        position: 'relative',
        height: '150px',
        width: '170px',
        bgcolor: '#ffefd5',
      }}
    >
      <Stack spacing={2} sx={{ mt: '10px' }}>
        <Typography
          textAlign={'center'}
          sx={{ mt: '30px', fontWeight: 'bold' }}
        >
          起床中
        </Typography>
        <Typography textAlign={'center'} sx={{ mt: '30px', fontSize: '13px' }}>
          昨晩の睡眠時間
        </Typography>
        <Typography textAlign={'center'} sx={{ mt: '30px', fontSize: '13px' }}>
          {formattedSleepTime}
        </Typography>
        {diffTime < 0 ? (
          <Typography
            textAlign={'center'}
            sx={{ mt: '30px', fontSize: '13px' }}
          >
            {formattedDiffTime}早く起きました
          </Typography>
        ) : (
          <Typography
            textAlign={'center'}
            sx={{ mt: '30px', fontSize: '13px' }}
          >
            {formattedDiffTime}寝坊しました
          </Typography>
        )}
      </Stack>
    </Card>
  )
}

export default WakeStatus
