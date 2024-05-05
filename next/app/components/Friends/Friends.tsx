import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import ScheduleIcon from '@mui/icons-material/Schedule'
import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material'

import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)

import React, { useEffect, useState } from 'react'

import { FriendsProf } from './FriendsProf'

type FriendSleepType = {
  targetWake: Dayjs
  actualWake: Dayjs
  state: 'wake' | 'sleep'
  bedtime: Dayjs
  comment: string
}

type PropsTypes = {
  user: {
    id: number
    name: string
    email: string
  }
  setSlide: (value: boolean) => void
  setShow: (value: boolean) => void
  show: boolean
  setFriend: (value: { id: number; name: string; email: string }) => void
  userSleep: FriendSleepType
  friendSleep: FriendSleepType
  setFriendSleep: (value: FriendSleepType) => void
}

const Friends: React.FC<PropsTypes> = ({
  user,
  setSlide,
  setShow,
  show,
  setFriend,
  userSleep,
  friendSleep,
  setFriendSleep,
}) => {
  const [shortendComment, setShortendComment] = useState(
    (userSleep && userSleep.comment) || '',
  )
  const formattedTargetWake = userSleep
    ? dayjs.utc(dayjs(userSleep.targetWake)).tz('Asia/Tokyo').format('HH:mm')
    : '未設定'

  const formattedActualWake = userSleep
    ? dayjs(userSleep.actualWake).format('HH:mm')
    : '未設定'

  const handleSlideOpen = () => {
    setFriend(user)
    setFriendSleep({
      ...friendSleep,
      ...userSleep,
    })
    setShow(false)
    setSlide(true)
  }
  const stateColor = userSleep
    ? userSleep.state == 'wake'
      ? '#a3f0b7'
      : '#adc5f7'
    : '#a3f0b7'

  useEffect(() => {
    if (shortendComment.length > 15) {
      setShortendComment(shortendComment.substring(0, 15) + '...')
    } else {
      setShortendComment(shortendComment)
    }
  }, [])
  return (
    <>
      {show && (
        <ListItem
          alignItems="flex-start"
          sx={{
            bgcolor: stateColor,
            mt: '-13px',
            borderRadius: '4px',
            mb: '5px',
            width: '100%',
          }}
        >
          <ListItemAvatar sx={{ mt: '-9px' }}>
            <FormControlLabel
              label=""
              control={
                <IconButton onClick={handleSlideOpen} sx={{ ml: '3px' }}>
                  <Avatar>
                    <FriendsProf height={40} width={40} otherUser={user} />
                  </Avatar>
                </IconButton>
              }
            />
          </ListItemAvatar>
          <Box sx={{ ml: '-8px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
            <Box
              sx={{
                display: 'flex',
                mt: '10px',
              }}
            >
              {userSleep && (
                <>
                  <Box sx={{ width: '100px' }}>
                    {userSleep.state == 'wake' ? (
                      <>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box
                            sx={{
                              color: '#f57e00',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <LightModeIcon
                              sx={{ mr: '10px' }}
                              fontSize="small"
                            />
                            <Typography fontWeight={'bold'}>起床中</Typography>
                          </Box>
                          <Box sx={{ display: 'flex' }}>
                            <ScheduleIcon
                              sx={{ mr: '10px' }}
                              fontSize="small"
                            />
                            {userSleep.actualWake ? (
                              <Typography>{formattedActualWake}</Typography>
                            ) : (
                              <Typography>未設定</Typography>
                            )}
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
                          <AccessAlarmIcon
                            sx={{ mr: '10px' }}
                            fontSize="small"
                          />
                          {userSleep.targetWake ? (
                            <Typography>{formattedTargetWake}</Typography>
                          ) : (
                            <Typography>未設定</Typography>
                          )}
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              )}
              {!userSleep && (
                <>
                  <Box width={100}>
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
                        <Typography fontWeight={'bold'} fontSize={13}>
                          未設定
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
              <Divider orientation="vertical" flexItem sx={{ mr: '10px' }} />
              {userSleep && (
                <Typography color="text.primary" width={145}>
                  {shortendComment}
                </Typography>
              )}
            </Box>
          </Box>
        </ListItem>
      )}
    </>
  )
}

export default Friends
