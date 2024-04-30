import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material'
import React from 'react'
import { CurrentUserProf } from '../currentUser/CurrentUserProf'
import { useSleepState, useUserState } from '@/app/hooks/useGrobalState'

const ListedCurrentUser = () => {
  const [sleep] = useSleepState()

  const [user] = useUserState()
  return (
    <>
      <List key={user.email}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <CurrentUserProf height={40} width={40} />
            </Avatar>
          </ListItemAvatar>
          <Box sx={{ mt: '10px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
            <Box
              sx={{
                display: 'flex',
                mt: '10px',
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: 'bold', textAlign: 'left', width: '100px' }}
                >
                  {sleep.state == 'wake' ? '起床中' : '睡眠中'}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mr: '18px' }} />
              <Typography color="text.primary" width={150} noWrap>
                {sleep.comment}
              </Typography>
            </Box>
          </Box>
        </ListItem>
        <Divider
          sx={{ m: '0 0 0 auto', mt: '15px', mb: '-20px', width: '95%' }}
        />
      </List>
    </>
  )
}

export default ListedCurrentUser
