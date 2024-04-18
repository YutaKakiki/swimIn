'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSnackbarState, useUserState } from '@/app/hooks/useGrobalState'
import useRequireSignIn from '@/app/hooks/useRequireSignIn'

const SignOut = () => {
  useRequireSignIn()
  const [, setSnackbar] = useSnackbarState()
  const [, setUser] = useUserState()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_out'
  const headers = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }
  const router = useRouter()
  useEffect(() => {
    axios.delete(url, { headers }).then(() => {
      localStorage.clear()
      setUser({
        id: 0,
        name: '',
        email: '',
        isSignIn: false,
        isFetched: true,
      })
      setSnackbar({
        message: 'ログアウトしました',
        severity: 'success',
        pathName: '/',
      })
      router.push('/')
    })
  }, [])
  return <></>
}

export default SignOut
