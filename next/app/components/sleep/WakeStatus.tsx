import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HistoryIcon from '@mui/icons-material/History'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, Card, Stack, Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useSleepState } from '@/app/hooks/useGrobalState'

const WakeStatus = () => {
  const [sleep] = useSleepState()
  console.log(sleep)
  const formattedActualWake = dayjs(sleep.actualWake).format('HH:mm')
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
      <Stack spacing={0.2}>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pt: '2px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pb: '2px',
            }}
          >
            <Tooltip title={'起床時刻'} arrow enterTouchDelay={0}>
              <AccessTimeIcon />
            </Tooltip>
            <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
              {formattedActualWake}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tooltip arrow title={'直近の睡眠時間'} enterTouchDelay={0}>
              <HistoryIcon />
            </Tooltip>
            <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>
              {formattedSleepTime}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            pt: '2px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {diffTime >= 0 ? (
            diffTime === 0 ? (
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '12px',
                  border: '1px ',
                  borderRadius: '30px',
                  p: '5px',
                  width: '130px',
                  bgcolor: '#00b02e',
                  color: 'white',
                }}
              >
                目標ぴったりに起床!
              </Typography>
            ) : (
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '12px',
                  border: '1px ',
                  borderRadius: '30px',
                  p: '5px',
                  width: '130px',
                  bgcolor: '#f55361',
                  color: 'white',
                }}
              >
                {formattedAbsDiffTime} 寝坊...
              </Typography>
            )
          ) : (
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '12px',
                border: '1px ',
                borderRadius: '30px',
                p: '5px',
                width: '130px',
                bgcolor: '#1b84f5',
                color: 'white',
              }}
            >
              {formattedAbsDiffTime} 早起き!
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  )
}

export default WakeStatus
