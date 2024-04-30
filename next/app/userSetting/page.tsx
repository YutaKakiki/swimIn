'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useUserState } from '../hooks/useGrobalState'

const SettingsPage = () => {
  const [user, setUser] = useUserState()
  const router = useRouter()
  const handleClick = () => {
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
      axios
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
        <Typography sx={{ textAlign: 'right', fontSize: '20px', mb: '10px' }}>
          SwimInから退会する
        </Typography>
        <Box sx={{ display: 'center', justifyContent: 'flex-end' }}>
          <Button onClick={handleClick} variant="outlined">
            削除
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default SettingsPage