'use client'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import {
  useSleepState,
  useSnackbarState,
  useUserState,
} from '@/app/hooks/useGrobalState'
import useRequireSignIn from '@/app/hooks/useRequireSignIn'

const SignOut = () => {
  useRequireSignIn()
  const [, setSleep] = useSleepState()
  const [, setSnackbar] = useSnackbarState()
  const [, setUser] = useUserState()
  const router = useRouter()
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_out'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    axios.delete(url, { headers }).then(() => {
      localStorage.clear()
      setUser({
        id: 0,
        name: '',
        email: '',
        isSignIn: false,
        isFetched: true,
      })
      setSleep({
        userId: 0,
        targetWake: dayjs(),
        actualWake: dayjs(),
        bedtime: dayjs(),
        state: 'wake',
        comment: '',
        isFetched: false,
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
