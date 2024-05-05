import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'

import React from 'react'
import useSWR from 'swr'
import { FriendsProf } from '../friends/FriendsProf'
import fetcher from '@/app/util/fetcher'

type FriendType = {
  id: number
  name: string
  email: string
}

const SleepingFriends = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps/sleeping_friends'
  const { data } = useSWR(url, fetcher)

  return (
    <Card
      sx={{
        position: 'relative',
        height: '316px',
        width: '170px',
        bgcolor: '#c4daf2',
        overflow: 'auto',
      }}
    >
      <Typography sx={{ textAlign: 'center', mb: '10px', mt: '10px' }}>
        睡眠中の友達
      </Typography>
      <List>
        {data &&
          data.map((user: FriendType) => (
            <>
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <FriendsProf height={30} width={30} otherUser={user} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight={'bold'}>{user.name}</Typography>
                  }
                  sx={{ ml: '-10px' }}
                />
              </ListItem>
              <Divider sx={{ width: '130px', m: '0 auto' }} />
            </>
          ))}
        {data && data.length == 0 && (
          <Typography
            sx={{ textAlign: 'center', fontSize: '15px', mt: '50px' }}
          >
            睡眠中の友達はいません
          </Typography>
        )}
      </List>
    </Card>
  )
}

export default SleepingFriends
