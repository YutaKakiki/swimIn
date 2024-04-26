import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'
import { FriendsProf } from './FriendsProf'

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
}
const Friends: React.FC<PropsTypes> = ({
  user,
  setSlide,
  setShow,
  show,
  setFriend,
}) => {
  const handleSlideOpen = () => {
    setFriend(user)
    setShow(false)
    setSlide(true)
  }
  return (
    <>
      {show && (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <FormControlLabel
                label=""
                control={
                  <IconButton onClick={handleSlideOpen}>
                    <Avatar>
                      <FriendsProf height={40} width={40} otherUser={user} />
                    </Avatar>
                  </IconButton>
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <>
                  <Box
                    sx={{
                      pt: '10px',
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ mr: '30px' }}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        noWrap
                        fontWeight="bold"
                      >
                        睡眠中
                      </Typography>
                    </Box>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mr: '20px' }}
                    />

                    <Box>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        明日起きてなかったらモーニングコール頼む
                      </Typography>
                    </Box>
                  </Box>
                </>
              }
            />
            <Divider />
          </ListItem>
        </>
      )}
    </>
  )
}

export default Friends
