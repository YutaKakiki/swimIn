'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useUserState } from '../hooks/useGrobalState'

const SettingsPage = () => {
  const [user, setUser] = useUserState()
  const router = useRouter()
  const handleClick = async () => {
    const res = confirm('本当に退会してよろしいですか？')
    if (res == true) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      const resetUser = {
        id: 0,
        name: '',
        email: '',
        isSignIn: false,
        isFetched: false,
      }
      await axios
        .delete(url, { headers })
        .then(() => {
          setUser({
            ...user,
            ...resetUser,
          })
          localStorage.clear()
          router.push('/')
        })
        .catch((err) => console.log(err))
    } else {
      router.push('/userSetting')
    }
  }
  return (
    <Box>
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontSize: '20px',
            mb: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          SwimInから退会する
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={handleClick}
            variant="outlined"
            sx={{ m: '0 auto', width: '150px' }}
          >
            退会
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default SettingsPage
