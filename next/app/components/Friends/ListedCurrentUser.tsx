import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import ScheduleIcon from '@mui/icons-material/Schedule'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)
import React, { useEffect, useState } from 'react'
import { CurrentUserProf } from '../currentUser/CurrentUserProf'
import { useSleepState, useUserState } from '@/app/hooks/useGrobalState'

const ListedCurrentUser = () => {
  const [sleep] = useSleepState()
  const [shortendComment, setShortendComment] = useState(sleep.comment)
  const [user] = useUserState()
  const stateColor = sleep
    ? sleep.state == 'wake'
      ? '#a3f0b7'
      : '#adc5f7'
    : '#a3f0b7'

  useEffect(() => {
    if (shortendComment.length > 17) {
      setShortendComment(shortendComment.substring(0, 17) + '...')
    } else {
      setShortendComment(sleep.comment)
    }
  }, [sleep])
  const formattedTargetWake = dayjs
    .utc(dayjs(sleep.targetWake))
    .tz('Asia/Tokyo')
    .format('HH:mm')
  const formattedActualWake = dayjs(sleep.targetWake).format('HH:mm')

  return (
    <>
      <List key={user.email}>
        <ListItem
          alignItems="flex-start"
          sx={{
            bgcolor: stateColor,
            pt: '-80apx',
            mb: '5px',
            borderRadius: '4px',
          }}
        >
          <ListItemAvatar sx={{ mt: '-1px' }}>
            <Avatar>
              <CurrentUserProf height={40} width={40} />
            </Avatar>
          </ListItemAvatar>
          <Box sx={{ mt: '-1px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>あなた</Typography>
            <Box
              sx={{
                display: 'flex',
                mt: '10px',
              }}
            >
              <Box sx={{ width: '100px' }}>
                {sleep.state == 'wake' ? (
                  <>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          color: '#f57e00',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <LightModeIcon sx={{ mr: '10px' }} fontSize="small" />
                        <Typography fontWeight={'bold'}>起床中</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <ScheduleIcon sx={{ mr: '10px' }} />
                        <Typography>{formattedTargetWake}</Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        color: '#04206b',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ModeNightIcon sx={{ mr: '10px' }} />
                      <Typography fontWeight={'bold'}>睡眠中</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <AccessAlarmIcon sx={{ mr: '10px' }} />
                      <Typography sx={{ mt: '2px' }}>
                        {formattedActualWake}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mr: '10px' }} />
              <Typography color="text.primary" width={140}>
                {shortendComment}
              </Typography>
            </Box>
          </Box>
        </ListItem>
      </List>
    </>
  )
}

export default ListedCurrentUser
