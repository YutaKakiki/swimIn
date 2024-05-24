import { Avatar, Box, Button, Card, Divider, Typography } from '@mui/material'
import axios from 'axios'
import React, { Dispatch, SetStateAction } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { FriendsProf } from './FriendsProf'
import fetcher from '@/app/util/fetcher'

type FriendsType = {
  id: number
  name: string
  email: string
}

type PropsType = {
  close: Dispatch<SetStateAction<boolean>>
}

const Followers: React.FC<PropsType> = ({ close }) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/users/followers'
  const { data } = useSWR(url, fetcher)
  const { mutate } = useSWRConfig()
  const handleFollow = async (follower: FriendsType) => {
    const data = follower
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/relationships'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const revalidateUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following'
    await axios.post(url, data, { headers }).then(() => {
      close(false)
      mutate(revalidateUrl)
    })
  }
  return (
    <>
      <Box>
        <Card
          sx={{
            width: { xs: '300px' },
            height: { xs: '300px' },
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {data && (
            <Box>
              <Typography
                textAlign={'center'}
                fontSize={'16px'}
                sx={{
                  border: '1px solid',
                  width: '200px',
                  m: '0 auto',
                  mt: '15px',
                  borderRadius: '20px',
                  p: 1,
                  color: '#001e43',
                }}
              >
                友達に追加されています！
              </Typography>
              <Box sx={{ p: 2, overflow: 'auto' }}>
                {data.map((follower: FriendsType) => (
                  <>
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mt: '20px',
                        }}
                      >
                        <Avatar sx={{ height: '33px', width: '33px' }}>
                          <FriendsProf
                            height={33}
                            width={33}
                            otherUser={follower}
                          />
                        </Avatar>
                        <Typography
                          fontSize={'20px'}
                          sx={{ ml: '10px' }}
                          fontWeight={'bold'}
                        >
                          {follower.name}
                        </Typography>
                        <Button
                          onClick={() => {
                            handleFollow(follower)
                          }}
                          sx={{ ml: '15px', width: '50px' }}
                          variant="outlined"
                        >
                          追加
                        </Button>
                      </Box>
                      <Divider
                        sx={{
                          width: '230px',
                          flex: 'display',
                          m: '0 auto',
                          mt: '5px',
                        }}
                      />
                    </>
                  </>
                ))}
                {data.length == 0 && (
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      textAlign={'center'}
                      fontSize={15}
                      sx={{
                        m: '0 auto',
                        mt: '20px',
                      }}
                    >
                      あなたを追加している友達はいません
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Card>
      </Box>
    </>
  )
}

export default Followers
