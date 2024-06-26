import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant'
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
  const stateColor =
    sleep.state === 'wake' || sleep.state === 'sleep'
      ? sleep.state === 'wake'
        ? '#a3f0b7'
        : '#adc5f7'
      : '#a3f0b7'

  useEffect(() => {
    if (shortendComment.length > 15) {
      setShortendComment(shortendComment.substring(0, 15) + '...')
    } else {
      setShortendComment(sleep.comment)
    }
  }, [sleep])
  const formattedTargetWake = dayjs
    .utc(dayjs(sleep.targetWake))
    .tz('Asia/Tokyo')
    .format('HH:mm')
  const formattedActualWake = dayjs(sleep.actualWake).format('HH:mm')
  const isOverSleeping =
    dayjs().isAfter(dayjs(sleep.targetWake)) && sleep.actualWake == null

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
            width: '100%',
          }}
        >
          <ListItemAvatar sx={{ mt: '-1px' }}>
            <Avatar>
              <CurrentUserProf height={40} width={40} />
            </Avatar>
            {isOverSleeping && (
              <NotificationImportantIcon
                fontSize="large"
                sx={{ pt: '5px', ml: '2px', color: '#fa5e52' }}
              />
            )}
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
                {sleep.state == 'wake' || sleep.state == 'sleep' ? (
                  sleep.state == 'wake' ? (
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ScheduleIcon sx={{ mr: '10px' }} fontSize="small" />
                          <Typography fontWeight={'bold'}>
                            {formattedActualWake}
                          </Typography>
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
                        <ModeNightIcon sx={{ mr: '10px' }} fontSize="small" />
                        <Typography fontWeight={'bold'}>睡眠中</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <AccessAlarmIcon sx={{ mr: '10px' }} fontSize="small" />
                        <Typography sx={{ mt: '2px' }} fontWeight={'bold'}>
                          {formattedTargetWake}
                        </Typography>
                      </Box>
                    </>
                  )
                ) : (
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
                      <ScheduleIcon sx={{ mr: '10px' }} fontSize="small" />
                      <Typography
                        sx={{ fontWeight: 'bold' }}
                        fontSize={'small'}
                      >
                        未設定
                      </Typography>
                    </Box>
                  </Box>
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
