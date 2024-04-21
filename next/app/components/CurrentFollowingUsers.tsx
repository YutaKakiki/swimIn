import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'

type PropsTypes = {
  user: {
    id: number
    name: string
    email: string
  }
}
const CurrentFollowingUsers: React.FC<PropsTypes> = ({ user }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
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

                <Divider orientation="vertical" flexItem sx={{ mr: '20px' }} />

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
  )
}

export default CurrentFollowingUsers
