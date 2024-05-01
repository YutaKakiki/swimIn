import { Box, Card, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useSleepState } from '@/app/hooks/useGrobalState'

const WakeStatus = () => {
  const [sleep] = useSleepState()
  const formattedActualWake = dayjs(sleep.targetWake).format('HH:mm')
  const sleepTime = dayjs(sleep.actualWake).diff(sleep.bedtime, 'minute')
  const formattedSleepTime = dayjs
    .duration(sleepTime, 'minute')
    .format('HH時間mm分')
  const diffTime = dayjs(sleep.actualWake).diff(sleep.targetWake, 'minute')
  const absDiffTime = dayjs.duration(Math.abs(diffTime), 'minute')
  const formattedAbsDiffTime =
    absDiffTime.asHours() < 1
      ? absDiffTime.format('mm分')
      : absDiffTime.format('HH時間mm分')
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
        <Typography textAlign={'center'} sx={{ mt: '30px', fontSize: '13px' }}>
          起床時間
        </Typography>
        <Typography textAlign={'center'} sx={{ mt: '30px', fontSize: '13px' }}>
          {formattedActualWake}
        </Typography>
        <Typography textAlign={'center'} sx={{ mt: '30px', fontSize: '13px' }}>
          昨晩の睡眠時間
        </Typography>
        <Typography textAlign={'center'} sx={{ mt: '30px', fontSize: '13px' }}>
          {formattedSleepTime}
        </Typography>
        <Box sx={{ mb: '15px' }}>
          {diffTime >= 0 ? (
            diffTime === 0 ? (
              <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                目標ぴったりに起床しました！
              </Typography>
            ) : (
              <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                {formattedAbsDiffTime}寝坊しました・・・
              </Typography>
            )
          ) : (
            <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
              {formattedAbsDiffTime}早く起床しました
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  )
}

export default WakeStatus
