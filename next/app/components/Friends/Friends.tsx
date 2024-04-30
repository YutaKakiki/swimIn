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

// import { Dayjs } from 'dayjs'
import { Dayjs } from 'dayjs'
import React from 'react'

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
}

const Friends: React.FC<PropsTypes> = ({
  user,
  setSlide,
  setShow,
  show,
  setFriend,
  userSleep,
}) => {
  const handleSlideOpen = () => {
    setFriend(user)

    setShow(false)
    setSlide(true)
  }
  return (
    <>
      {show && (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
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
          <Box sx={{ mt: '15px', ml: '-8px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
            <Box
              sx={{
                display: 'flex',
                mt: '10px',
              }}
            >
              {userSleep && (
                <Typography
                  sx={{ fontWeight: 'bold', textAlign: 'left', width: '100px' }}
                >
                  {userSleep.state == 'wake' ? '起床中' : '睡眠中'}
                </Typography>
              )}
              <Divider orientation="vertical" flexItem sx={{ mr: '18px' }} />
              {userSleep && (
                <Typography color="text.primary" width={150} noWrap>
                  {userSleep.comment}
                </Typography>
              )}
            </Box>
          </Box>
        </ListItem>
      )}
      <Divider
        sx={{ m: '0 0 0 auto', mt: '15px', mb: '-20px', width: '95%' }}
      />
    </>
  )
}

export default Friends
