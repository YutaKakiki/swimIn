import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import HotelIcon from '@mui/icons-material/Hotel'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { Box, Card, Stack, Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useSleepState } from '@/app/hooks/useGrobalState'

const SleepStatus = () => {
  const [sleep] = useSleepState()
  const formettedTargetWake = dayjs(sleep.targetWake).format('HH:mm')
  const formattedBedTime = dayjs(sleep.bedtime).format('HH:mm')
  return (
    <Card
      sx={{
        height: '150px',
        width: '170px',
        bgcolor: '#adc5f7',
      }}
    >
      <Stack spacing={1.5} sx={{ mt: '2px' }}>
        <Box
          sx={{
            width: '100px',
            pt: '10px',
            pl: '34px',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              border: '2px solid',
              borderColor: '#001e43',
              borderRadius: '10px',
              p: 1,
              bgcolor: '#799ffc',
              display: 'flex',
              justifyContent: 'center',
              color: '#001e43',
            }}
          >
            <ModeNightIcon />
            睡眠中
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tooltip title={'目標起床時刻'} arrow enterTouchDelay={0}>
            <AccessAlarmIcon fontSize="large" sx={{ mt: '-3px' }} />
          </Tooltip>
          <Typography
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={23}
            sx={{ ml: '2px' }}
          >
            {formettedTargetWake}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tooltip title={'就寝時刻'} arrow enterTouchDelay={0}>
            <HotelIcon fontSize="large" sx={{ mt: '-3px' }} />
          </Tooltip>
          <Typography
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={23}
            sx={{ ml: '3px' }}
          >
            {formattedBedTime}
          </Typography>
        </Box>
      </Stack>
    </Card>
  )
}

export default SleepStatus
