import PeopleIcon from '@mui/icons-material/People'
import {
  Avatar,
  Box,
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
      <Box
        sx={{
          p: '2px',
          m: ' 0 auto',
          mt: '10px',
          width: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid',
          color: '#020b38',
          borderRadius: '20px',
          borderColor: '#001e43',
        }}
      >
        <PeopleIcon sx={{ mr: '5px' }} />
        <Typography sx={{ fontWeight: 'bold' }}>睡眠中</Typography>
      </Box>
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
            誰も寝ていません
          </Typography>
        )}
      </List>
    </Card>
  )
}

export default SleepingFriends
